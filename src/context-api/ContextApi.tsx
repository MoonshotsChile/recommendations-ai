import React, { createContext, FC, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { setLocalStorage } from "./localstorage";

export enum NAVBAR_ACTIONS {
  likes = "LIKES",
  notifications = "NOTIFICATIONS",
  matchs = "MATCHS",
  locations = "LOCATIONS",
  misions = "MISIONS",
}

export interface ContextProps {
  isAuthenticated?: boolean;
  navbarSelected?: NAVBAR_ACTIONS;
  location?: coord
}

export interface ContextPropsExtended extends ContextProps{
  saveContext: (props: ContextProps) => void;
}

export interface coord {
  latitude: number,
  longitude: number
}

const initialState: ContextPropsExtended = {
  isAuthenticated: false,
  location: {latitude: -33.430508, longitude: -70.6464339},
  saveContext: () => {}
};

const ContextApi = createContext<ContextPropsExtended>(initialState);

const ContextApiProvider: FC = ({ children }) => {
  const [context, setContext] = useState<ContextProps>(initialState);

  useEffect(()=>{
    saveInLocalStorage(context)
  }, [context])

  const saveContext = (newState: ContextProps) => {
    setContext((prevState) => ({ ...prevState, ...newState }));
  };

  const saveInLocalStorage = (props: ContextProps) => {
    Object.entries(props).forEach(([key, value]) => {
      setLocalStorage(key, value);
    });
  }

  return (
    <ContextApi.Provider
      value={{
        isAuthenticated: context.isAuthenticated,
        navbarSelected: context.navbarSelected,
        location: context.location,
        saveContext,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

ContextApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContextApi, ContextApiProvider };
