import { useContext, useEffect } from "react";
import { ContextApi } from "../../context-api/ContextApi";
import { useHistory } from "react-router-dom";


export const authValidation = () => {
    const { isAuthenticated, userdata } = useContext(ContextApi)
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated || !userdata?.id && userdata?.id === "undefined") history.push('/login')
    }, [ContextApi])
}
