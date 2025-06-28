"use client";

import store from "@/redux/store";

import React, { createContext, useState, ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";



interface ReduxProviderProps {
  children: ReactNode;
}

const persistor = persistStore(store);

export const ReduxProvider: React.FC<ReduxProviderProps> = ({
  children,
}) => {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     
        {children}
    
      </PersistGate>
    </Provider>
  );
};
