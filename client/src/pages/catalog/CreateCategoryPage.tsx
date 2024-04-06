import React, {useState} from 'react';
import {Button, Container, Stack, TextInput} from "@mantine/core";
import {createCategory} from "../../http/productsAPI";
import {notifications} from "@mantine/notifications";

const CreateCategoryPage = () => {
    const [category, setCategory] = useState<string>('');

    const handleCreate = async () => {
        if(category.length < 2) {
            notifications.show({
                title: 'Ошибка',
                message: `Название категории должно включать минимум 3 символа`,
                color: 'red',
            });
            return;
        }
        try{
            await createCategory(category)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <Container w="30%" style={{justifyContent: 'center'}}>
            <Stack>
                <TextInput required label="Новая категория"
                       placeholder="Категория" onChange={(e) => setCategory(e.target.value)}></TextInput>
                <Button onClick={handleCreate}>Создать категорию</Button>
            </Stack>
        </Container>
    );
};

export default CreateCategoryPage;