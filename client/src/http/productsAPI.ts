import {$authHost} from "./index";

export const getAllProducts = async (
    searchTerm?: string,
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number
) => {
    let url = 'http://localhost:5000/api/products';
    if (searchTerm) {
        url += `?searchTerm=${searchTerm}`;
    }
    if (categoryId) {
        url += (searchTerm ? '&' : '?') + `categoryId=${categoryId}`;
    }
    if (minPrice !== undefined && minPrice !== 0) {
        url += (searchTerm || categoryId ? '&' : '?') + `minPrice=${minPrice}`;
    }
    if (maxPrice !== undefined && maxPrice !== 0) {
        url += (searchTerm || categoryId || minPrice ? '&' : '?') + `maxPrice=${maxPrice}`;
    }

    const { data } = await $authHost.get(url);

    return data;
};



export const getProductById = async (id: number) => {
    const {data} = await $authHost.get(`http://localhost:5000/api/products/${id}`)
    return data
}

export const createProduct = async (product_name: string, description: string, category_id: number, price: number, general_note: string, special_note: string) => {
    const {data} = await $authHost.post(`http://localhost:5000/api/products`, {
        product_name,
        description,
        category_id,
        price,
        general_note,
        special_note
    })
    return data
}

export const updateProduct = async (id: number, product_name: string, description: string, category_id: number, price: number, general_note: string, special_note: string) => {
    const {data} = await $authHost.patch(`http://localhost:5000/api/products/${id}`, {
        product_name,
        description,
        category_id,
        price,
        general_note,
        special_note
    })
    return data
}

export const deleteProduct = async (id: number) => {
    const {data} = await $authHost.delete(`http://localhost:5000/api/products/${id}`)
    return {data}
}

export const getAllCategories = async () => {
    const {data} = await $authHost.get('http://localhost:5000/api/categories')
    return data
}

export const getCategoryById = async (id: number) => {
    const {data} = await $authHost.get(`http://localhost:5000/api/categories/${id}`)
    return data
}

export const createCategory = async (category_name: string) => {
    const {data} = await $authHost.post(`http://localhost:5000/api/categories`, {category_name})
    return data
}

export const updateCategory = async (id: number, category_name: string) => {
    const {data} = await $authHost.patch(`http://localhost:5000/api/categories/${id}`, {category_name})
    return data
}

export const deleteCategory = async (id: number) => {
    const {data} = await $authHost.delete(`http://localhost:5000/api/categories/${id}`)
    return data
}