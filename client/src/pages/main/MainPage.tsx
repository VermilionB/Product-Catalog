import React from 'react';
import {Container, Title} from "@mantine/core";
import {observer} from "mobx-react-lite";

import ProductsGrid from "../../components/products/ProductsGrid";

const MainPage = observer(() => {

    return (
        <Container mt="20px">
            <Title order={1} ta='center' mb={20}>Каталог продуктов</Title>
            <ProductsGrid/>
        </Container>
    );
});

export default MainPage;
