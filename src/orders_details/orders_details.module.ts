import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders_details.entity';
import { OrdersDetailsService } from './orders_details.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersDetail])],
  providers: [OrdersDetailsService],
  exports: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
