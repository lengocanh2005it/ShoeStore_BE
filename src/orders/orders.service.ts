import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DiscountsService } from 'src/discounts/discounts.service';
import { Discount } from 'src/discounts/entities/discount.entity';
import { OrdersDetailsService } from 'src/orders_details/orders_details.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentMethod } from 'src/payments/enums/paymentMethod.enum';
import { PaymentStatus } from 'src/payments/enums/paymentStatus.enum';
import { PaymentsService } from 'src/payments/payments.service';
import { UsersService } from 'src/users/users.service';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly discountsService: DiscountsService,
    private readonly paymentsService: PaymentsService,
    private readonly ordersDetailService: OrdersDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { user_id, code, orderDetails, ...orderData } = createOrderDto;

    const user = await this.usersService.findOne(user_id);

    let discount = null as Discount;

    if (code) {
      discount = await this.discountsService.findDiscountByCode(code);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = this.orderRepository.create(orderData);

    await this.orderRepository.save(order);

    for (const orderDetail of orderDetails) {
      await this.ordersDetailService.create(orderDetail, order.id);
    }

    if (discount) {
      await this.dataSource
        .createQueryBuilder()
        .relation(Order, 'discount')
        .of(order.id)
        .set(discount.id);
    }

    const newPayment = await this.paymentsService.create({
      payment_date: new Date(),
      amount: orderData.total_price,
      status: PaymentStatus.PENDING,
      method: PaymentMethod.CREDIT_CARD,
    });

    if (newPayment) {
      await this.dataSource
        .createQueryBuilder()
        .relation(Payment, 'order')
        .of(newPayment.id)
        .set(order.id);
    }

    await this.dataSource
      .createQueryBuilder()
      .relation(Order, 'user')
      .of(order.id)
      .set(user_id);

    return await this.orderRepository.findOne({
      where: { id: order.id },
      relations: ['user', 'discount', 'payment', 'orderDetails'],
    });
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'discount', 'payment', 'orderDetails'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'discount', 'payment', 'orderDetails'],
    });

    if (!order) throw new NotFoundException('Order Not Found.');

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'discount', 'payment', 'orderDetails'],
    });

    if (!order) throw new NotFoundException('Order Not Found.');

    await this.orderRepository.update({ id }, updateOrderDto);

    return order;
  }

  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) throw new NotFoundException('Order Not Found.');

    await this.orderRepository.delete(order.id);
  }
}
