import UserContext from 'src/context/UserContext';
import React from "react";

export default function AuthEnforce() {
    const { userData } = React.useContext(UserContext);
    React.useEffect(async () => {
        if (!window.location.href.includes("/login") && !window.location.href.includes("/register")) {
            if (userData.user) {
                window.location.href = "/dashboard";
            } else {
                window.location.href = "/login";
            }
        }
    }, [userData.user])
    return (<></>);
}