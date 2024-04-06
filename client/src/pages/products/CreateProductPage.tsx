import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Input, NumberInput, Select, Stack, Text, Textarea, Title} from "@mantine/core";
import {ICategory} from "../../components/products/ProductsGrid";
import {createProduct, getAllCategories} from "../../http/productsAPI";
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../routes/consts";

const CreateProductPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ICategory[]>([]);

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<string | number>('');
    const [generalNote, setGeneralNote] = useState('');
    const [specialNote, setSpecialNote] = useState('');
    const [category, setCategory] = useState<ICategory>();

    useEffect(() => {
        getAllCategories().then(data => setCategories(data));
    }, []);
    const handleCreate = async () => {
        if (!category || !productName || !description || !price || !generalNote || !specialNote) {
            notifications.show({
                title: 'Ошибка',
                message: `Введите данные во все поля`,
                color: 'red',
            });
            return;
        }

        try {
            await createProduct(
                productName,
                description,
                category.id,
                +price,
                generalNote,
                specialNote
            );
            navigate(MAIN_ROUTE);
        } catch (error: any) {
            notifications.show({
                title: 'Ошибка',
                message: `Продукт не добавлен: ${error.response.data.message}`,
                color: 'red',
            });
        }
    }

    return (
        <Container w="30%" style={{justifyContent: 'center'}} mt='20px'>
            <Title order={1} ta='center' mb={20}>Создание продукта</Title>

            <Card shadow="sm" padding="lg" radius="md" withBorder
                  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Stack gap="lg">
                    <Stack gap="xs">
                        <Text ta="center" fw={900}>Название</Text>
                        <Input value={productName}
                               placeholder="Название"
                               onChange={(e) => setProductName(e.target.value)}/>
                    </Stack>
                    <Stack gap="xs">
                        <Text ta="center" fw={900}>Описание</Text>
                        <Textarea value={description}
                               placeholder="Описание"
                               onChange={(e) => setDescription(e.target.value)}/>
                    </Stack>
                    <Stack gap="xs">
                        <Text ta="center" fw={900}>Категория</Text>
                        <Select
                            radius="md"
                            data={categories && categories.map((category) => ({
                                value: category.id.toString(),
                                label: category.category_name
                            }))}
                            value={category?.id.toString()}
                            onChange={(selectedOption) => {
                                const selectedCategory = categories.find(category => category.id.toString() === selectedOption);
                                if (selectedCategory) {
                                    setCategory(selectedCategory);
                                }
                            }}
                            style={{flexGrow: 1}}
                            placeholder="Выберите категорию"
                            searchable
                        />
                    </Stack>
                    <Stack gap="xs">
                        <Text ta="center" fw={900}>Примечание общее</Text>
                        <Input value={generalNote}
                               placeholder="Примечание общее"
                               onChange={(e) => setGeneralNote(e.target.value)}/>
                    </Stack>
                    <Stack gap="xs">
                        <Text ta="center" fw={900}>Примечание специальное</Text>
                        <Input value={specialNote}
                               placeholder="Примечание специальное"
                               onChange={(e) => setSpecialNote(e.target.value)}/>
                    </Stack>
                    <Stack gap="xs">
                        <Text ta="center" fw={900}>Стоимость в рублях</Text>
                        <NumberInput
                            placeholder="Стоимость в рублях"
                            clampBehavior="strict"
                            min={0}
                            max={10000}
                            value={price}
                            onChange={setPrice}
                        />
                    </Stack>

                    <Button onClick={handleCreate}>Сохранить</Button>
                </Stack>
            </Card>
        </Container>
    );
};

export default CreateProductPage;