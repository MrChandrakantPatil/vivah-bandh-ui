import { useContext } from "react";
import RegisterContext from "../context/RegisterContext";
import { validators } from "../utils/fieldsValidators";

export function useRegister() {
    const { state, dispatch } = useContext(RegisterContext);

    const handleBlur = (field, value, compareValue) => {
        dispatch({
            type: "SET_ERRORS",
            payload: {
                [field]:
                    field === "confirmPassword"
                        ? validators.confirmPassword(
                            value,
                            compareValue
                        )
                        : validators[field](value)
            }
        });
    };

    const handleFocus = (field) => {
        dispatch({
            type: "SET_ERRORS",
            payload: {
                [field]: ""
            }
        });
    };

    const handleChange = (field, value) => {
        dispatch({
            type: "UPDATE_FORM",
            payload: {
                [field]: value
            }
        });

        if (value.trim()) {
            dispatch({
                type: "SET_ERRORS",
                payload: {
                    [field]: ""
                }
            });
        }
    };

    return {
        state,
        dispatch,
        handleBlur,
        handleFocus,
        handleChange
    };
}