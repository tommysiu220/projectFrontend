import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./config/RouterConfig.tsx";
import {useEffect, useState} from "react";
import {UserData} from "./data/user/UserData.ts";
import * as FirebaseAuthService from '../src/authService/FirebaseAuthService.ts'
import {LoginUserContext} from "./context/LoginUserContext.ts";

export default function  App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    }, []);

    return (
        <div>
            <LoginUserContext.Provider value={loginUser}>
                <RouterProvider router={router}/>
            </LoginUserContext.Provider>
        </div>
    )
}

