import * as React from 'react';
import { useContext, useState } from 'react';
import { format, validate } from "rut.js";
import { useHistory } from "react-router-dom";
import { ContextApi } from "../context-api/ContextApi";
import { lockIcon, sbenefits, user, userIcon } from "../assets";
import { Input, InputAdornment } from '@material-ui/core';
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { getLocalStorage } from "../context-api/helpers/localstorage";
import { UserdataUseCase } from "../domain/UserdataUseCase";
import { Userdata } from "../domain/entity/Userdata";
import LoginForm from "../components/login-form/LoginForm";

const LoginPage: React.FC = () => {
    const userdataUseCase = new UserdataUseCase()
    const {saveContext} = useContext(ContextApi)
    let {isAuthenticated} = useContext(ContextApi)

    const history = useHistory();

    const [userdata, setUserdata] = useState({
        username: "",
        password: ""
    })

    const [isLoading] = useState(false);

    const handleChange = (e: { target: { id: string; value: string; } }) => {
        const {id, value} = e.target
        setUserdata(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleChangeRut = (e: { target: { id: string; value: string; } }) => {
        if (e.target.value.length >= 6) e.target.value = format(e.target.value)
        return handleChange(e)
    }

    const isValidForm = () => {
        return validate(userdata.username)
    }

    const goToNext = () => {
        isAuthenticated = true
        saveContext({isAuthenticated})
        let { username } = userdata
        // @ts-ignore
        if (!username) username = getLocalStorage('username')
        if (!username) username = generateUniqueID()

        const newUserdata: Userdata = {
            id: username,
            "not-likes": [],
            likes: [],
            later: []
        }

        userdataUseCase.find(username)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    saveUserData(newUserdata)
                }
            })
            .then((userdata: Userdata) => {
                saveContext({userdata})
            })
            .catch(error => {
                saveUserData(newUserdata)
                console.error(error)
            })


        history.push('/onboarding')
    }

    const saveUserData = (userdata: Userdata) => {
        userdataUseCase.add(userdata)
            .then(() => {
                saveContext({userdata})
            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <div className="container">
            <div className="section login hero is-fullheight">
                <div className="hero is-borderless is-fullheight">
                    <LoginForm user={userdata} goToNext={goToNext}/>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
