import {useToggle, upperFirst} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Checkbox,
    Anchor,
    Stack, Select,
} from '@mantine/core';
import React, {useContext, useEffect, useState} from "react";
import {getAllRoles, login, register} from "../../http/userAPI";
import {notifications} from "@mantine/notifications";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../routes/consts";

interface IRoles {
    id: number;
    role_name: string;
}

const AuthPage = observer((props: PaperProps) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const [roles, setRoles] = useState<IRoles[]>([]);
    const [selectedRole, setSelectedRole] = useState<string | null>('');

    useEffect(() => {
        getAllRoles().then(data => setRoles(data))
    }, []);

    const [type, toggle] = useToggle(['вход', 'регистрация']);
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });


    const onRegister = async () => {
        try {
            const data = await register(form.values.email, form.values.password, selectedRole)
            if(data){
                user.setIsAuth(true);
                user.setUser(data);
                navigate(MAIN_ROUTE);
            }
        } catch (err: any) {
            notifications.show({
                title: 'Ошибка',
                message: `Регистрация не удалась: ${err.response.data.message}`,
                color: 'red',
            });
        }
    }

    const onLogin = async () => {
        try {
            const data = await login(form.values.email, form.values.password)
            if(data){
                user.setIsAuth(true);
                user.setUser(data);
                navigate(MAIN_ROUTE);
            }
        } catch (err: any) {
            notifications.show({
                title: 'Ошибка',
                message: `Вход не удался: ${err.response.data.message}`,
                color: 'red',
            });
        }
    }

    return (
        <div className="auth_container">
            <div className="auth_form">
                <Paper radius="md" p="xl" withBorder {...props}>
                    <Text ta='center' mb={20} size="lg" fw={500}>
                        {upperFirst(type)}
                    </Text>

                    <form onSubmit={form.onSubmit(() => type === 'регистрация' ? onRegister() : onLogin())}>
                        <Stack>
                            <TextInput
                                required
                                label="Email"
                                placeholder="Ваш email"
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
                            />

                            <PasswordInput
                                required
                                label="Пароль"
                                placeholder="Ваш пароль"
                                value={form.values.password}
                                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                error={form.errors.password && 'Password should include at least 6 characters'}
                                radius="md"
                            />

                            {type === 'регистрация' && roles.length > 0 && (
                                <Stack>
                                    <Select
                                        required
                                        label="Роль"
                                        radius="md"
                                        data={roles.map((role) => ({value: role.id.toString(), label: role.role_name}))}
                                        value={selectedRole}
                                        onChange={setSelectedRole}
                                        style={{flexGrow: 1}}
                                        placeholder="Выберите роль"
                                        searchable
                                    />
                                    <Checkbox
                                        label="Я согласен со всем, вообще со всем"
                                        checked={form.values.terms}
                                        onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                                    />
                                </Stack>

                            )}
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                                {type === 'регистрация'
                                    ? 'Уже есть аккаунт? Авторизуйтесь'
                                    : "Все еще нет аккаунта? Зарегистрируйтесь"}
                            </Anchor>
                            <Button type="submit" radius="lg">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </div>
        </div>
    );
});

export default AuthPage;