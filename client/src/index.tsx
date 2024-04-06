import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import UserStore from "./store/userStore";
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

interface AppContextType {
    user: UserStore;

}

export const Context = createContext<AppContextType>({
    user: new UserStore()
});

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
        }}>
            <MantineProvider defaultColorScheme="dark">
                <Notifications/>
                <App/>
            </MantineProvider>
        </Context.Provider>
    </React.StrictMode>
);
