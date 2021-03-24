import { useContext, useEffect } from "react";
import { ContextApi } from "../../context-api/ContextApi";
import { useHistory } from "react-router-dom";


export const authValidation = () => {
    const { saveContext, userdata } = useContext(ContextApi)
    const history = useHistory();

    useEffect(() => {
        (!userdata?.id || userdata?.id === "undefined") ?
            history.push('/login') :
            saveContext({isAuthenticated: true})
    }, [ContextApi])
}
