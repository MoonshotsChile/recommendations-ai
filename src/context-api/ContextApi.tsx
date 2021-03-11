import React from 'react';
import PropTypes from "prop-types";

export type ContextProps = {
    loggedIn?: boolean,
    saveContext: (props: any) => void
};

const initialState: ContextProps = {
    loggedIn: false,
    saveContext: () => {}
}


const ContextApi = React.createContext<ContextProps> (initialState);


const ContextApiProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [context, setContext] = React.useState<ContextProps>(initialState);

    const saveContext = (newState: ContextProps) => {
        setContext(prevState => ({...prevState, ...newState}));
    };

    return (
        <ContextApi.Provider value={{
            loggedIn: context.loggedIn,
            saveContext
        }}>
            {children}
        </ContextApi.Provider>
    );
}

ContextApiProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { ContextApi, ContextApiProvider };
