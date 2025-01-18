import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { DiscountsService } from 'src/discounts/discounts.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly discountsService: DiscountsService,
    private readonly paymentsService: PaymentsService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { user_id, discount_id, payment_id, ...orderData } = createOrderDto;

    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const discount = discount_id ? await this.discountsService.findOne(discount_id) : null;
    
    if (discount_id && !discount) {
      throw new NotFoundException('Discount not found');
    }

    const payment = await this.paymentsService.findOne(payment_id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const order = this.orderRepository.create(orderData);

    await this.orderRepository.save(order);

    await this.dataSource
      .createQueryBuilder()
      .relation(Order, 'user')
      .of(order.id)
      .set(user_id);

    if (discount_id) {
      await this.dataSource
        .createQueryBuilder()
        .relation(Order, 'discount')
        .of(order.id)
        .set(discount_id);
    }

    await this.dataSource
      .createQueryBuilder()
      .relation(Order, 'payment')
      .of(order.id)
      .set(payment_id);

    return order;
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
