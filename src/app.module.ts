import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: parseInt(process.env.MYSQL_PORT) || 3309,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'shoes-db',
      entities: [Product, User, Category],
      synchronize: true, 
    }),
    ProductsModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // Kiểm tra kết nối
    if(this.dataSource.isInitialized) {
      console.log('Database connected successfully');
    }
    
    // Thực hiện raw query
    // this.dataSource.query('SELECT * FROM products')
    //   .then(products => console.log('>>> check products: ', products))
  } 
}
