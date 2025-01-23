import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

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

  async findAll(queries?: Record<string, string>): Promise<Product[]> {
    const where: Record<string, any> = {};

    if (queries?.name) {
      where.name = Like(`%${queries.name}%`);
    }

    return this.productRepository.find({
      where,
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

  async updateOne(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('Product Not Found.');

    await this.productRepository.update({ id }, updateProductDto);

    return await this.productRepository.findOneBy({ id });
  }

  async updateStockQuantityOfProduct(
    productId: string,
    quantity: number,
  ): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) throw new NotFoundException('Product Not Found.');

    await this.productRepository.update(
      {
        id: productId,
      },
      {
        stock_quantity: product.stock_quantity - quantity,
      },
    );
  }
}
