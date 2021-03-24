import React, { createContext, FC, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLocalStorage, setLocalStorage } from "./helpers/localstorage";
import { Userdata } from "../domain/entity/Userdata";

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
  userdata?: Userdata;
  location?: Coord
}

export interface ContextPropsExtended extends ContextProps{
  saveContext: (props: ContextProps) => void;
}

export interface Coord {
  latitude: number,
  longitude: number
}

const initialState: ContextPropsExtended = {
  isAuthenticated: false,
  location: {latitude: 0, longitude: 0},
  userdata: undefined,
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
        isAuthenticated: context.isAuthenticated !== undefined ? context.isAuthenticated : getLocalStorage('isAuthenticated'),
        navbarSelected: context.navbarSelected,
        location: context.location !== undefined ? context.location : getLocalStorage('location'),
        userdata: context.userdata !== undefined ? context.userdata : getLocalStorage('userdata') ,
        saveContext
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
