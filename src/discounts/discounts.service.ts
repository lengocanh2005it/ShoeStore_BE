import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto) {
    try {
      const discount = this.discountRepository.create(createDiscountDto);

      return await this.discountRepository.save(discount);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new BadRequestException(
        `Failed to create product: ${error.message}`,
      );
    }
  }

  async findAll() {
    return await this.discountRepository.find();
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.discountRepository.findOne({
      where: { id },
    });

    if (!discount) throw new NotFoundException('Discount Not Found.');

    return discount;
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const discount = await this.discountRepository.findOneBy({ id });
    if (!discount) throw new NotFoundException('Discount Not Found.');
    await this.discountRepository.update({ id }, updateDiscountDto);
    return await this.discountRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const discount = await this.discountRepository.findOneBy({ id });
    if (!discount) throw new NotFoundException('Discount Not Found.');
    await this.discountRepository.delete(discount.id);
  }

  async findDiscountByCode(code: string): Promise<Discount> {
    const discount = await this.discountRepository.findOneBy({ code });
    if (!discount) throw new NotFoundException('Discount Not Found.');
    return discount;
  }
}
