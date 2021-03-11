import * as React from 'react';
import { useContext, useState } from "react";
import { format, validate } from "rut.js";
import { useHistory } from "react-router-dom";
import { ContextApi } from "../context-api/ContextApi";

const LoginPage: React.FC = () => {
    const { saveContext } = useContext(ContextApi)

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
        return validate(userdata.username) && userdata.password.length > 3
    }

    const goToNext = () => {
        saveContext({isAuthenticated: true})
        history.push('/benefits')
    }

    return (
        <div className="section">
            <div className="modal-card">
                <section className="modal-card-body">
                    <form autoComplete="none">
                        <div className="field">
                            <div className="control">
                                <input className="input" onChange={handleChangeRut} type="text" id="username"
                                       value={userdata.username} placeholder="RUT Usuario" autoFocus={true} autoComplete="none"/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" onChange={handleChange} type="password" id="password"
                                       value={userdata.password} placeholder="Clave" autoComplete="none"/>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="modal-card-body">
                    <button id="btn-fetch-data" className={`button is-fullwidth is-success ${isLoading ? 'is-loading' : ''}`}
                            disabled={isLoading || !isValidForm()} onClick={goToNext}>Login
                    </button>
                </section>
            </div>
        </div>
    );
}

export default LoginPage;
