import { useReducer } from "react";

import RegisterContext from "./RegisterContext";
import { registerInitialState } from "../reducers/registerInitialState";
import { registerReducer } from "../reducers/registerReducer";

export function RegisterProvider({ children }) {
    const [state, dispatch] = useReducer(registerReducer, registerInitialState);

    return (
        <RegisterContext.Provider value={{ state, dispatch }}>
            {children}
        </RegisterContext.Provider>
    );
}