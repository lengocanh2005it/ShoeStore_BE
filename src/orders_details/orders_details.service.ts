import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdersDetailDto } from './dto/create-orders_detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-orders_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders_details.entity';
import { DataSource, Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersDetailsService {
 constructor(
  @InjectRepository(OrdersDetail) private readonly oderDetailRepository: Repository<OrdersDetail>,
  private readonly dataSource: DataSource,
) {}

  async create(createOrdersDetailDto: CreateOrdersDetailDto) {
    const { order_id, product_id, ...orderDetailData } = createOrdersDetailDto;

    console.log(order_id, product_id)

    const order = await this.dataSource.getRepository(Order).findOne({ where: { id: order_id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const product = await this.dataSource.getRepository(Product).findOne({ where: { id: product_id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const orderDetail = this.oderDetailRepository.create(orderDetailData);
    await this.oderDetailRepository.save(orderDetail);

    await this.dataSource
      .createQueryBuilder()
      .relation(OrdersDetail, 'order')
      .of(orderDetail.id)
      .set(order_id);

    await this.dataSource
      .createQueryBuilder()
      .relation(OrdersDetail, 'product')
      .of(orderDetail.id)
      .set(product_id);
    
    return orderDetail;
  }

  findAll() {
    return `This action returns all ordersDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersDetail`;
  }

  update(id: number, updateOrdersDetailDto: UpdateOrdersDetailDto) {
    return `This action updates a #${id} ordersDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersDetail`;
  }
}
