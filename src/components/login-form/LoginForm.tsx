import { Input, InputAdornment } from "@material-ui/core"
import { lockIcon, sbenefits, userIcon } from "../../assets"
import * as React from "react"
import { useState } from "react"
import { format, validate } from "rut.js"
import './LoginForm.scss'

interface LoginFormProps {
    user: Userdata,
    goToNext: (props?:any) => any|void
}

interface Userdata {
    username: string,
    password: string
}

export const LoginForm = ({user, goToNext}: LoginFormProps) => {

    const [userdata, setUserdata] = useState(user)

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

    return (
        <>
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
            <section className="card-content is-borderless">
                <form autoComplete="off">
                    <div style={{display: 'none'}}>
                        <input type="text" id="PreventChromeAutocomplete"
                               name="PreventChromeAutocomplete" autoComplete="address-level4"/>
                    </div>
                    <div className="field">
                        <div className="control">
                            <Input
                                id="username"
                                placeholder="Ingresa tu RUT"
                                value={userdata?.username}
                                onChange={handleChangeRut}
                                autoComplete='off'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <img src={userIcon}/>
                                    </InputAdornment>
                                }
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <Input
                                id="password"
                                type="password"
                                value={userdata?.password}
                                placeholder="Ingresa tu clave de internet"
                                onChange={handleChange}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <img src={lockIcon}/>
                                    </InputAdornment>
                                }
                            />
                        </div>
                    </div>
                </form>
            </section>
            <section className="hero-foot has-text-centered">
                <div className="column is-three-quarter">
                    <button id="btn-login"
                            className="button is-primary is-fullwidth is-inline has-text-centered"
                            disabled={isLoading || !isValidForm()} onClick={goToNext}>Login
                    </button>
                </div>
                <div className="column is-three-quarter">
                    <button id="btn-guest" className="button is-fullwidth is-inline has-text-centered"
                            disabled={isLoading} onClick={goToNext}>Invitado
                    </button>
                </div>
            </section>
        </>
    )
}

export default LoginForm
