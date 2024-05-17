import { useCallback, useState, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [tokenExpirationDate,setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        const expiryDate = expirationDate || new Date(new Date().getTime() + 1000*60*60);
        setTokenExpirationDate(expiryDate);
        localStorage.setItem(
        "userData",
        JSON.stringify({ userId: uid, token: token, expiration: expiryDate.toISOString() })
        );
    }, []);

    const logout = useCallback((uid) => {
        setToken(false);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
        }else{
        clearTimeout(logoutTimer);
        }
    },[logout,tokenExpirationDate,token]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId, storedData.token);
        }
    },[login]);
    return {token,login,logout,userId};
}