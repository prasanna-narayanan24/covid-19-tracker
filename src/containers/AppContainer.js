import React, { useReducer } from "react";
import { ContextProvider } from "../providers/ContextProvider";
import { mainReducer } from "../reducers/mainReducer";
import initialState from "../reducers/initialState";
import Dashboard from "../components/Dashboard";
import { createMuiTheme, ThemeProvider, colors } from "@material-ui/core";

const AppContainer = () => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    const theme = createMuiTheme({
        palette: {
            primary: colors.blue,
        },
        typography: {
            fontFamily: [
                "Fira code",
                "Exo",
                "Trebuchet MS",
                "Roboto",
                "sans-serif"
            ].join(",")
        }
    });
    return <ContextProvider value={[state, dispatch]}>
        <ThemeProvider theme={theme}>
            <Dashboard {...state} />
        </ThemeProvider>
    </ContextProvider>
}

export default AppContainer;