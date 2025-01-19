import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);

    await this.paymentRepository.save(payment);

    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ['order'],
    });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!payment) throw new NotFoundException('Payment Not Found.');

    return payment;
  }

  async remove(id: string): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) throw new NotFoundException('Payment Not Found.');
    await this.paymentRepository.delete(payment.id);
  }
}
