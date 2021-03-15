import React, { createContext, FC, useState } from 'react'
import PropTypes from 'prop-types'

export enum NAVBAR_ACTIONS {
    likes='LIKES', notifications='NOTIFICATIONS', matchs='MATCHS', locations='LOCATIONS'
}

export interface ContextProps {
    isAuthenticated?: boolean,
    navbarSelected?: NAVBAR_ACTIONS
}

export interface ContextPropsExtended {
    isAuthenticated?: boolean,
    navbarSelected?: NAVBAR_ACTIONS
    saveContext: (props: ContextProps) => void
}

const initialState: ContextPropsExtended = {
    isAuthenticated: true,
    navbarSelected: undefined,
    saveContext: () => {}
}

const ContextApi = createContext<ContextPropsExtended> (initialState);

const ContextApiProvider: FC = ({ children }) => {
    const [context, setContext] = useState<ContextProps>(initialState);

    const saveContext = (newState: ContextProps) => {
        setContext(prevState => ({...prevState, ...newState}));
    };

    return (
        <ContextApi.Provider value={{
            isAuthenticated: context.isAuthenticated,
            navbarSelected: context.navbarSelected,
            saveContext
        }}>
            {children}
        </ContextApi.Provider>
    );
}

ContextApiProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { ContextApi, ContextApiProvider }
