import React, {useContext, useEffect} from 'react';
import {Button, Container, Divider, Group, Text} from "@mantine/core";
import LinkComponent from "./router/LinkComponent";
import {CATEGORIES_CATALOG_ROUTE, CREATE_CATEGORY_ROUTE, CREATE_PRODUCT_ROUTE, MAIN_ROUTE} from "../routes/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {IUser} from "../store/userStore";

const Header = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate()

    const onLogout = () => {
        user.setIsAuth(false);
        user.setUser({id: 0, role_id: 0, email: ''})
        localStorage.removeItem('token');
        navigate('/auth');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<IUser>(token);
                user.setUser(decodedToken);
            } catch (error) {
                console.error("Failed to decode token", error);
            }
        } else {
            user.setUser({id: 0, role_id: 0, email: ''});
        }
    }, [user.isAuth]);

    return (
        <div className="header-container">
            {user.isAuth && (
                <Container
                    fluid
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    size="xl"
                    h="75px"
                >
                    <Group style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '75px',
                        marginLeft: '20px'
                    }}>
                        <LinkComponent
                            to={MAIN_ROUTE}
                            className="custom-link"
                            activeClassName="active"
                            size="lg"
                            underline="never"
                            style={{
                                color: 'teal',
                                textDecoration: 'none',
                            }}
                        >
                            Продукты
                        </LinkComponent>
                        <LinkComponent
                            to={CATEGORIES_CATALOG_ROUTE}
                            className="custom-link"
                            activeClassName="active"
                            size="lg"
                            underline="never"
                            style={{
                                color: 'teal',
                                textDecoration: 'none',
                            }}
                        >
                            Справочник категорий
                        </LinkComponent>
                    </Group>

                    <Group>
                        {user.user && user.user.role_id === 2 && (
                            <Button variant="outline" onClick={() => navigate(CREATE_PRODUCT_ROUTE)}>Создать продукт</Button>
                        )}
                        {user.user && user.user.role_id === 3 && (
                            <Button variant="outline" onClick={() => navigate(CREATE_CATEGORY_ROUTE)}>Создать категорию</Button>
                        )}
                        {user.user && <Text>{user.user.email}</Text>}
                        <Button onClick={onLogout}>Выход</Button>
                    </Group>
                </Container>
            )}
            <Divider w="100%"/>
        </div>
    );
});

export default Header;