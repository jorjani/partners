import UserContext from 'src/context/UserContext';
import React from "react";
import Axios from "axios";

export default function AuthEnforce() {
    const { userData, setUserData } = React.useContext(UserContext);
    const checkLoggedIn = async () => {
        const token = localStorage.getItem("auth-token");
        if (token == null) {
            localStorage.setItem("auth-token", "");
        }
        const tokenRes = await Axios.post(
            "http://localhost:5000/auth/token",
            null,
            { headers: { "x-auth-token": token } }
        );
        if (tokenRes.data) {
            const userRes = await Axios.get(
                `http://localhost:5000/users/${tokenRes.data.type}/${tokenRes.data.id}`,
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
    };
    const controlAccess = () => {
        if (userData.token) {
            if (window.location.pathname === "/login" || window.location.pathname === "/register") {
                window.location.href = "/dashboard";
            }
        } else {
            if (window.location.pathname === "/dashhboard" || window.location.pathname.includes("course")) {
                window.location.href = "/login";
            }
        }
    }
    React.useEffect(() => {
        controlAccess();
    });
    React.useEffect(() => {
        checkLoggedIn();
        controlAccess();
    }, []);
    return (<></>);
}