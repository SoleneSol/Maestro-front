import UserContext from "./UserContext.jsx";
import { useState } from "react";

export function UserProvider({children}) {
    const [userIs, setUserIs] = useState('visitor');
    const [refreshList,setrefreshList] = useState('false');

    function needRefreshProjectList(){
        setrefreshList(true); // il faut recharger
    }
    function desactiveRefreshProjectList(){
        setrefreshList(false); // pas besoin de recharger
    }


    function loginProvider(role) {
        setUserIs(role);
    };

    function logoutProvider() {
        setUserIs('visitor');
    }

    return (
        <UserContext.Provider value={{userIs, loginProvider, logoutProvider,refreshList,needRefreshProjectList,desactiveRefreshProjectList}}>
            {children}
        </UserContext.Provider>
    );
}