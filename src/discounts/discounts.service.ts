import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount) private readonly discountRepository: Repository<Discount>
  ) {}
  
  async create(createDiscountDto: CreateDiscountDto) {
    try {
      const discount = await this.discountRepository.create(createDiscountDto)
      
      return await this.discountRepository.save(discount)
      return 'This action adds a new discount';
    }
    catch(error) {
      console.error('Error creating product:', error);
      throw new BadRequestException(`Failed to create product: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all discounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
