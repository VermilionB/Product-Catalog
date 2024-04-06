import {AUTH_ROUTE, CATEGORIES_CATALOG_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE} from "./consts";

import MainPage from "../pages/main/MainPage";
import AuthPage from "../pages/auth/AuthPage";
import ProductFullCard from "../components/products/ProductFullCard";
import CategoriesCatalogPage from "../pages/catalog/CategoriesCatalogPage";

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: AuthPage
    }
]

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductFullCard
    },
    {
        path: CATEGORIES_CATALOG_ROUTE,
        Component: CategoriesCatalogPage
    },
]