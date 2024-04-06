import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import AppRouter from "./components/router/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./index";
import {Flex, Loader} from "@mantine/core";
import Header from "./components/Header";

function App() {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            user.setIsAuth(true)
        }
        setLoading(false);
    }, [])

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

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
