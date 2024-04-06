import {makeAutoObservable} from 'mobx';

export interface IUser {
    id: number,
    role_id: number,
    email: string
}

export default class UserStore {
    private _isAuth: boolean = false;
    private _user: IUser = {id: 0, role_id: 0, email: ''};

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }

    setUser(user: IUser) {
        this._user = user
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    get user(): IUser {
        return this._user;
    }
}
