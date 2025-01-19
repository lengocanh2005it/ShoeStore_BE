import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrdersDetailDto } from './dto/create-orders_detail.dto';
import { OrdersDetail } from './entities/orders_details.entity';

@Injectable()
export class OrdersDetailsService {
  constructor(
    @InjectRepository(OrdersDetail)
    private readonly oderDetailRepository: Repository<OrdersDetail>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createOrdersDetailDto: CreateOrdersDetailDto,
    orderId: string,
  ): Promise<void> {
    const { product_id, ...orderDetailData } = createOrdersDetailDto;

    const product = await this.dataSource
      .getRepository(Product)
      .findOne({ where: { id: product_id } });

    if (!product) throw new NotFoundException('Product Not Found.');

    const orderDetail = this.oderDetailRepository.create({
      ...orderDetailData,
      unit_price: product.price,
    });

    await this.oderDetailRepository.save(orderDetail);

    await this.dataSource
      .createQueryBuilder()
      .relation(OrdersDetail, 'product')
      .of(orderDetail.id)
      .set(product_id);

    await this.dataSource
      .createQueryBuilder()
      .relation(OrdersDetail, 'order')
      .of(orderDetail.id)
      .set(orderId);
  }
}
