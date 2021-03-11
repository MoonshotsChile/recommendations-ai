import React, { createContext, FC, useState } from 'react'
import PropTypes from 'prop-types'

export type ContextProps = {
    isAuthenticated?: boolean,
    saveContext: (props: any) => void
};

const initialState: ContextProps = {
    isAuthenticated: true,
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
