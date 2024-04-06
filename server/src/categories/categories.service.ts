import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.categories.create({
            data: createCategoryDto
        });
    }

    async findAll() {
        return this.prisma.categories.findMany();
    }

    async findOne(id: number) {
        return this.prisma.categories.findFirst({
            where: {id},
            include: {
                products: {
                    select: {
                        id: true,
                        product_name: true,
                        description: true,
                        price: true,
                    }
                }
            }
        });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return this.prisma.categories.update({
            where: {id},
            data: updateCategoryDto
        });
    }

    async remove(id: number) {
        const existingCategory = await this.findOne(id);

        await this.prisma.products.deleteMany({
            where: {
                category_id: existingCategory.id
            }
        });

        return this.prisma.categories.delete({
            where: {id}
        });
    }
}
