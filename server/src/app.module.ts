import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {PrismaService} from "./prisma.service";
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, CategoriesModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
