import React, { useCallback, useContext, useEffect, useState } from 'react';
import { deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../../http/productsAPI";
import { ICategory } from "../../components/products/ProductsGrid";
import {Accordion, Anchor, Button, Container, Group, List, Paper, Text, TextInput, Title} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../routes/consts";

interface IShortProduct {
    id: number;
    product_name: string;
    description: string;
    price: string;
}

interface ICategoryWithProducts extends ICategory {
    products: IShortProduct[];
}

const CategoriesCatalogPage = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategoryWithProducts | null>(null);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState<string>('');

    useEffect(() => {
        getAllCategories().then(data => setCategories(data));
    }, []);

    const fetchCategoryProducts = useCallback((categoryId: number) => {
        getCategoryById(categoryId).then(data => {
            setSelectedCategory(data);
        });
    }, []);

    const handleCategoryClick = (category: ICategory) => {
        setSelectedCategoryId(category.id);
        fetchCategoryProducts(category.id);
    };

    const handleDeleteCategory = (categoryId: number) => {
        deleteCategory(categoryId).then(() => {
            setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
            if (selectedCategoryId === categoryId) {
                setSelectedCategoryId(null);
                setSelectedCategory(null);
            }
        });
    };

    const handleEditCategory = (categoryId: number, newName: string) => {
        updateCategory(categoryId,  newName).then(() => {
            setCategories(prevCategories => prevCategories.map(category =>
                category.id === categoryId ? { ...category, category_name: newName } : category
            ));
            setEditingCategoryId(null);
        });
    };

    return (
        <Container w="100%" mt="20px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Title order={1} ta='center' mb={20}>Справочник категорий</Title>
            {categories && (
                <Paper w={600}>
                    <Accordion variant="contained">
                        {categories.map((category, index) => (
                            <Accordion.Item value={category.id.toString()}
                                            key={category.id}
                                            onClick={() => {
                                                if (editingCategoryId !== category.id) {
                                                    handleCategoryClick(category);
                                                }
                                            }}>
                                <Accordion.Control>
                                    <Group justify='space-between'>
                                        <Text fw={600}>{category.category_name}</Text>
                                        {user && user.user.role_id === 3 && (
                                            <Group mr={10}>
                                                {editingCategoryId === category.id ? (
                                                    <TextInput
                                                        value={editingCategoryName}
                                                        onChange={(e) => setEditingCategoryName(e.currentTarget.value)}
                                                        placeholder="Введите новое имя категории"
                                                        rightSection={<Button color='teal' onClick={() => handleEditCategory(category.id, editingCategoryName)}>Сохранить</Button>}
                                                    />
                                                ) : (
                                                    <Button color='blue' variant='outline' onClick={() => { setEditingCategoryId(category.id); setEditingCategoryName(category.category_name); }}>Изменить</Button>
                                                )}
                                                <Button color='red' variant='outline' onClick={() => handleDeleteCategory(category.id)}>Удалить</Button>
                                            </Group>
                                        )}
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {selectedCategoryId === category.id && selectedCategory && (
                                        <div>
                                            <List>
                                                {selectedCategory.products.map((product) => (
                                                    <List.Item key={product.id}>
                                                        <Anchor onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
                                                            {product.product_name} - {product.price} р.
                                                        </Anchor>
                                                    </List.Item>
                                                ))}
                                            </List>
                                        </div>
                                    )}
                                </Accordion.Panel>
                            </Accordion.Item>

                        ))}
                    </Accordion>
                </Paper>
            )}
        </Container>
    );
});

export default CategoriesCatalogPage;
