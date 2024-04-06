import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class ProductsService {

    constructor(private readonly prisma: PrismaService) {
    }

    async create(createProductDto: CreateProductDto) {
        return this.prisma.products.create({
            data: {
                product_name: createProductDto.product_name,
                description: createProductDto.description,
                price: createProductDto.price,
                general_note: createProductDto.general_note,
                special_note: createProductDto.special_note,
                category_id: createProductDto.category_id
            }
        });
    }

    async findAll(
        searchTerm: string = '',
        categoryId?: number,
        minPrice: number = 0,
        maxPrice: number = Number.MAX_SAFE_INTEGER
    ) {
        const whereCondition: {
            product_name?: { contains: string; mode: 'insensitive' };
            category_id?: number;
            price?: { gte: number; lte: number };
        } = {};

        if (searchTerm) {
            whereCondition.product_name = {contains: searchTerm, mode: 'insensitive'};
        }

        if (categoryId) {
            whereCondition.category_id = categoryId;
        }

        if (!minPrice) {
            minPrice = 0;
        }

        if (!maxPrice) {
            maxPrice = Number.MAX_SAFE_INTEGER;
        }

        if (minPrice > 0 || maxPrice > 0) {
            whereCondition.price = {
                gte: minPrice,
                lte: maxPrice,

            };
        }

        return this.prisma.products.findMany({
            where: whereCondition,
            include: {
                categories: {
                    select: {
                        id: true,
                        category_name: true
                    }
                }
            }
        });
    }


    async findOne(id: number) {
        return this.prisma.products.findFirst({
            where: {id},
            include: {
                categories: {
                    select: {
                        id: true,
                        category_name: true
                    }
                }
            }
        });
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        return this.prisma.products.update({
            where: {id},
            data: {
                product_name: updateProductDto.product_name,
                description: updateProductDto.description,
                price: updateProductDto.price,
                general_note: updateProductDto.general_note,
                special_note: updateProductDto.special_note,
                category_id: updateProductDto.category_id
            }
        });
    }

    async remove(id: number) {
        return this.prisma.products.delete({
            where: {id}
        });
    }
}
