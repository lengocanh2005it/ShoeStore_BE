import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsModule } from 'src/discounts/discounts.module';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentsModule } from 'src/payments/payments.module';
import { UsersModule } from 'src/users/users.module';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersDetailsModule } from 'src/orders_details/orders_details.module';
import { OrdersDetail } from 'src/orders_details/entities/orders_details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Payment, OrdersDetail]),
    UsersModule,
    DiscountsModule,
    PaymentsModule,
    OrdersDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
