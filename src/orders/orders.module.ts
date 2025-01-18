import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DiscountsModule } from 'src/discounts/discounts.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order]),
  UsersModule,
  DiscountsModule,
  forwardRef(() => PaymentsModule),],
  exports: [OrdersService]
})
export class OrdersModule {}
