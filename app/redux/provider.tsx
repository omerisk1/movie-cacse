"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React, { ReactNode } from "react";
import Home from "../page";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Home></Home>
    </Provider>
  );
}
