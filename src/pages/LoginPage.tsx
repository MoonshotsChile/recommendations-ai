import * as React from 'react';
import { useContext, useState } from "react";
import { format, validate } from "rut.js";
import { useHistory } from "react-router-dom";
import { ContextApi } from "../context-api/ContextApi";
import { sbenefits } from "../assets";

const LoginPage: React.FC = () => {
    const { saveContext } = useContext(ContextApi)
    let { isAuthenticated } = useContext(ContextApi)

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
        isAuthenticated = true
        saveContext({ isAuthenticated })
        history.push('/onboarding')
    }

    return (
        <div className="section login hero is-fullheight">
            <div className="card is-borderless is-fullheight">
                <section className="card-header is-borderless">
                    <div className="container has-text-centered">
                        <p className="title">
                            <img src={sbenefits} alt="SBenefits"/>
                        </p>
                        <h6 className="title">
                            Bienvenido a SBenefits
                        </h6>
                        <p className="subtitle">
                            Ingresa con los datos de tu cuenta Sbank
                        </p>
                    </div>
                </section>
                <section className="card-content  is-borderless">
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
                <section className="modal-card-body box has-text-centered is-borderless">
                    <button id="btn-fetch-data" className={`button is-fullwidth is-success ${isLoading ? 'is-loading' : ''}`}
                            disabled={isLoading || !isValidForm()} onClick={goToNext}>Login
                    </button>
                    <button id="btn-fetch-data" className={`button is-fullwidth`}
                            disabled={isLoading || !isValidForm()} onClick={goToNext}>Invitado
                    </button>
                </section>
            </div>
        </div>
    );
}

export default LoginPage;
