import React, {useEffect, useState} from 'react';
import {Input, NumberInput, Select, SimpleGrid, Button, Group, Container, Stack, Divider, Text} from "@mantine/core";
import {getAllCategories, getAllProducts} from "../../http/productsAPI";
import ProductSmallCard from "./ProductSmallCard";

export interface ICategory {
    id: number;
    category_name: string;
}

export interface IProduct {
    id: number,
    product_name: string,
    description: string,
    price: string,
    general_note: string,
    special_note: string,
    categories: ICategory,
}

const ProductsGrid = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string | null>('');
    const [minPrice, setMinPrice] = useState<number | string>('');
    const [maxPrice, setMaxPrice] = useState<number | string>('');

    useEffect(() => {
        getAllCategories().then(data => setCategories(data));
        getAllProducts().then(data => setProducts(data));
    }, []);

    useEffect(() => {
        getAllProducts(searchTerm, categoryId || undefined, +minPrice, +maxPrice).then(data => setProducts(data));
    }, [categoryId]);

    useEffect(() => {
        searchTerm === '' && getAllProducts(searchTerm, categoryId || undefined, +minPrice, +maxPrice).then(data => setProducts(data));
    }, [searchTerm]);
    const handleSearch = () => {
        getAllProducts(searchTerm, categoryId || undefined, +minPrice, +maxPrice).then(data => setProducts(data));
    };

    return (
        <Stack gap="md">
            <Container fluid m={0} p={0}>
                <Stack gap="lg">
                    <Group>
                        <Input style={{flexGrow: 1}} placeholder="Поиск по названию продукта" value={searchTerm}
                               onChange={(e) => setSearchTerm(e.currentTarget.value)}/>
                        <Button color='teal' variant='outline' onClick={handleSearch}>Поиск</Button>
                    </Group>

                    <Group>
                        <NumberInput label="Цена от"
                                     clampBehavior="strict"
                                     min={0}
                                     max={10000} value={minPrice} onChange={(value) => setMinPrice(value)}/>
                        <NumberInput label="Цена до"
                                     clampBehavior="strict"
                                     min={0}
                                     max={10000} value={maxPrice} onChange={(value) => setMaxPrice(value)}/>
                    </Group>

                    <Divider w="100%"/>

                    <Select placeholder="Выберите категорию"
                            value={categoryId}
                            data={categories.map((category) => ({value: category.id.toString(), label: category.category_name}))}
                            onChange={setCategoryId}/>
                </Stack>
            </Container>

            <SimpleGrid cols={4} w="100%">
                {products && products.map(product => (
                    <ProductSmallCard key={product.id} product={product}/>
                ))}
            </SimpleGrid>
        </Stack>
    );
};

export default ProductsGrid;
