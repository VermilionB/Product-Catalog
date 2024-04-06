import React from 'react';
import {Card, Group, Text} from "@mantine/core";
import {IProduct} from "./ProductsGrid";
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../routes/consts";

interface ProductSmallCardProps {
    product: IProduct;
}

const ProductSmallCard: React.FC<ProductSmallCardProps> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <Card withBorder radius="md" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Group mt="md" justify="center">
                <div>
                    <Text fw={500} size="xl">{product.product_name}</Text>
                    <Text fz="md" c="dimmed">
                        {product.description}
                    </Text>
                </div>
            </Group>

            <Card.Section my="md">
                <Group justify="center">
                    <Text fz="lg">Цена: </Text>
                    <Text fz="xl" fw={700} style={{lineHeight: 1}}>
                        {product.price} р.
                    </Text>
                </Group>
            </Card.Section>
        </Card>
    );
};

export default ProductSmallCard;
