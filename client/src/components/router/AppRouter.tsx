import React, {useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../../routes/routes';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import AuthPage from "../../pages/auth/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import CreateProductPage from "../../pages/products/CreateProductPage";
import {CREATE_CATEGORY_ROUTE, CREATE_PRODUCT_ROUTE} from "../../routes/consts";
import CreateCategoryPage from "../../pages/catalog/CreateCategoryPage";

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path={CREATE_PRODUCT_ROUTE} element={<ProtectedRoute Component={CreateProductPage} role_id={2} />} />
            <Route path={CREATE_CATEGORY_ROUTE} element={<ProtectedRoute Component={CreateCategoryPage} role_id={3} />} />

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<AuthPage />} />
        </Routes>
    );
});

export default AppRouter;