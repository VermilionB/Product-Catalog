import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {deleteProduct, getAllCategories, getProductById, updateProduct} from "../../http/productsAPI";
import {ICategory, IProduct} from "./ProductsGrid";
import {
    Button,
    Card,
    Container,
    Flex,
    Group,
    Input,
    Loader,
    NumberInput,
    Select,
    Stack,
    Text,
    Divider, Title
} from "@mantine/core";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {MAIN_ROUTE} from "../../routes/consts";

const ProductFullCard = observer(() => {
    const {id} = useParams();
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [product, setProduct] = useState<IProduct>();
    const [originalProduct, setOriginalProduct] = useState<IProduct>();

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getAllCategories().then(data => setCategories(data));

        id && getProductById(+id).then(data => {
            setProduct(data);
            setOriginalProduct(data); // Установите исходное состояние продукта
            setLoading(false);
        });
    }, [id]);

    const toggleEditMode = () => {
        if (!isEditing) {
            setOriginalProduct(product); // Установите исходное состояние продукта перед редактированием
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        if (product && id) {
            try {
                await updateProduct(
                    +id,
                    product.product_name,
                    product.description,
                    +product.categories.id,
                    +product.price,
                    product.general_note,
                    product.special_note
                );
                setIsEditing(false);
            } catch (error) {
                console.error("Failed to update product", error);
            }
        }
    };

    const handleCancel = () => {
        setProduct(originalProduct); // Восстановите исходное состояние продукта
        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            id && await deleteProduct(+id);
            navigate(MAIN_ROUTE);
        } catch (error) {
            console.error("Failed to update product", error);
        }
    }

    if (loading) {
        return (
            <Flex
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: window.screen.height - 154,
                }}
            >
                <Loader color="blue" type="bars"/>
            </Flex>
        );
    }

    if (product) {
        return (
            <Container w="30%" style={{justifyContent: 'center'}} mt="20px">
                <Title order={1} ta='center' mb={20}>{product?.product_name}</Title>

                <Card shadow="sm" padding="lg" radius="md" withBorder
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Stack gap={20}>
                        <Stack>
                            <Text ta="center" fw={900}>Название</Text>
                            {isEditing ? (
                                <Input value={product?.product_name}
                                       onChange={(e) => setProduct({...product, product_name: e.target.value})}/>
                            ) : (
                                <Text ta="center">{product?.product_name}</Text>
                            )}
                        </Stack>
                        <Stack>
                            <Text ta="center" fw={900}>Описание</Text>
                            {isEditing ? (
                                <Input value={product?.description}
                                       onChange={(e) => setProduct({...product, description: e.target.value})}/>
                            ) : (
                                <Text ta="center">{product?.description}</Text>
                            )}
                        </Stack>
                        <Stack>
                            <Text ta="center" fw={900}>Категория</Text>

                            {isEditing ? (
                                <Select
                                    radius="md"
                                    data={categories && categories.map((category) => ({value: category.id.toString(), label: category.category_name}))}
                                    value={product?.categories.id.toString()}
                                    onChange={(selectedOption) => {
                                        const selectedCategory = categories.find(category => category.id.toString() === selectedOption);
                                        if (selectedCategory) {
                                            setProduct({
                                                ...product,
                                                categories: {
                                                    id: selectedCategory.id,
                                                    category_name: selectedCategory.category_name
                                                }
                                            });
                                        }
                                    }}
                                    style={{flexGrow: 1}}
                                    placeholder="Pick category"
                                    searchable
                                />

                            ) : (
                                <Text ta="center">{product?.categories.category_name}</Text>
                            )}
                        </Stack>
                        <Stack>
                            <Text ta="center" fw={900}>Примечание общее</Text>
                            {isEditing ? (
                                <Input value={product?.general_note}
                                       onChange={(e) => setProduct({...product, general_note: e.target.value})}/>
                            ) : (
                                <Text ta="center">{product?.general_note}</Text>
                            )}
                        </Stack>
                        {user.user && user.user.role_id !== 1 && (
                            <Stack>
                                <Text ta="center" fw={900}>Примечание специальное</Text>
                                {isEditing ? (
                                    <Input value={product?.special_note}
                                           onChange={(e) => setProduct({...product, special_note: e.target.value})}/>
                                ) : (
                                    <Text ta="center">{product?.special_note}</Text>
                                )}
                            </Stack>
                        )}
                        <Stack>
                            <Text ta="center" fw={900}>Стоимость в рублях</Text>
                            {isEditing ? (
                                <NumberInput
                                    hideControls
                                    value={product?.price}
                                    onChange={(value) => setProduct({...product, price: value.toString()})}
                                />) : (
                                <Text ta="center">{product?.price}</Text>
                            )}
                        </Stack>
                        {user && user.user.role_id === 2 && (
                            <>
                                {isEditing ? (
                                    <Group>
                                        <Button onClick={handleSave}>Сохранить</Button>
                                        <Button color='red' variant="outline" onClick={handleCancel}>Отменить</Button>
                                    </Group>
                                ) : (
                                    <Button onClick={toggleEditMode}>Изменить</Button>
                                )}
                            </>
                        )}

                    </Stack>
                    {user && user.user.role_id === 2 && (
                        <>
                            <Divider my="md" w="100%"/>
                            <Card.Section pb="md">
                                <Button color='red' onClick={handleDelete}>Удалить</Button>
                            </Card.Section>
                        </>
                    )}
                </Card>
            </Container>
        );
    }
    return null;

});

export default ProductFullCard;