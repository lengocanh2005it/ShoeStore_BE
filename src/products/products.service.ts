import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Product) private readonly productRepository: Repository<Product>,
      private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
        const category = await this.categoriesService.findOne(createProductDto.category_id);
        
        if (!category) {
            throw new BadRequestException('Category not found');
        }

        const product = this.productRepository.create({
            ...createProductDto,
            category_id: category.id,
            created_at: new Date(),
            updated_at: new Date()
        });

        return await this.productRepository.save(product);
    } catch (error) {
        console.error('Error creating product:', error);
        throw new BadRequestException(`Failed to create product: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
