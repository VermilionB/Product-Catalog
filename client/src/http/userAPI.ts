import {$host} from "./index";
import {jwtDecode} from "jwt-decode";
import {IUser} from "../store/userStore";

export const getAllRoles = async () => {
    const {data} = await $host.get('http://localhost:5000/api/auth/roles')
    return data
}

export const register = async (email: string, password: string, role_id: string | null) => {
    const {data} = await $host.post('http://localhost:5000/api/auth/register', {email, password, role_id})
    localStorage.setItem('token', data.access_token)
    return jwtDecode<IUser>(data.access_token);
}

export const login = async (email: string, password: string) => {
    const {data} = await $host.post('http://localhost:5000/api/auth/login', {email, password})
    localStorage.setItem('token', data.access_token)
    return jwtDecode<IUser>(data.access_token);
}