import UserContext from 'src/context/UserContext';
import React from "react";
import Axios from "axios";
import { Router } from "next/router";
export default function AuthEnforce() {
    const { userData, setUserData } = React.useContext(UserContext);
    const checkLoggedIn = async () => {
        const token = localStorage.getItem("auth-token");
        if (token == null) {
            localStorage.setItem("auth-token", "");
        }
        const tokenRes = await Axios.post(
            "http://localhost:5000/api/auth/token",
            null,
            { headers: { "x-auth-token": token } }
        );
        console.log(tokenRes)
        if (tokenRes.data) {
            const userRes = await Axios.get(
                `http://localhost:5000/api/users/${tokenRes.data.type}/${tokenRes.data.id}`,
                {
                    headers: { "x-auth-token": token },
                }
            );
            setUserData({
                token,
                user: userRes.data,
                type: tokenRes.data.type,
            });
        }
        
        controlAccess(tokenRes.data)
    };
    const controlAccess = (token) => {
        if (token) {
            if (window.location.pathname === "/login" || window.location.pathname === "/register") {
                window.location.href = "/dashboard";
            }
        } else {
            if (window.location.pathname.includes("dashboard") || window.location.pathname.includes("course")) {
                window.location.href = "/login";
            }
        }
    }
    React.useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            // checkLoggedIn();
        })
    }, []);
    return (<></>);
}