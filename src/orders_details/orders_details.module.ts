import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders_details.entity';
import { OrdersDetailsService } from './orders_details.service';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersDetail, Product, Category]),
    ProductsModule,
    CategoriesModule,
  ],
  providers: [OrdersDetailsService, ProductsService],
  exports: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
