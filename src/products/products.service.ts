import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { category_id, ...res } = createProductDto;

    const category = await this.categoriesService.findOne(category_id);

    if (!category) {
      throw new NotFoundException('Category Not Found.');
    }

    const product = this.productRepository.create(res);

    await this.productRepository.save(product);

    await this.dataSource
      .createQueryBuilder()
      .relation(Product, 'category')
      .of(product.id)
      .set(category_id);

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });

    if (!product) throw new NotFoundException('Product Not Found.');

    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product Not Found.');
    await this.productRepository.delete(product.id);
  }
}
