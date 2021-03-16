import { useContext, useEffect } from "react";
import { ContextApi } from "../../context-api/ContextApi";
import { useHistory } from "react-router-dom";

export const authValidation = () => {
    const { isAuthenticated } = useContext(ContextApi)
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated) history.push('/login')
    }, [ContextApi])
}
