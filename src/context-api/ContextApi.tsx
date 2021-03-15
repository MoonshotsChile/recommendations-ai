import React, { createContext, FC, useState } from 'react'
import PropTypes from 'prop-types'

export enum NAVBAR_SELECTED {
    likes='LIKES', notifications='NOTIFICATIONS', matchs='MATCHS', locations='LOCATIONS'
}

export type ContextProps = {
    isAuthenticated?: boolean,
    navbarSelected?: NAVBAR_SELECTED,
    saveContext: (props: any) => void
};

const initialState: ContextProps = {
    isAuthenticated: true,
    navbarSelected: undefined,
    saveContext: () => {}
}

const ContextApi = createContext<ContextProps> (initialState);

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
