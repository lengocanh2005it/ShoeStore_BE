import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders_details.service';
import { OrdersDetailsController } from './orders_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders_details.entity';

@Module({
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
  imports: [TypeOrmModule.forFeature([OrdersDetail])],
})
export class OrdersDetailsModule {}
