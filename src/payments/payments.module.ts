import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [TypeOrmModule.forFeature([Payment]), forwardRef(() => OrdersModule)],
  exports: [PaymentsService]
})
export class PaymentsModule {}
