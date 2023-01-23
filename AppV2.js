import React, { useState } from "react";
import LandingPage from "./v2/dashboard/LandingPage";
import { ThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';
import { Route, Switch, Redirect } from "react-router-dom";
import store, { history } from "./v2/redux";
import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import MainLayout from "./v2/util/MainLayout";
import MapContainer from "./v2/maps/MapContainer";
import CalendarContainer from "./v2/calendar/CalendarContainer";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#F1F2F6',
            light: '#ffffff',
        },
        secondary: {
            main: '#27197E',
        },
    },
    //4 * spacing parameter --> pixels
    spacing: 4,
    typography: {
        fontFamily: 'Noto Sans'
    }
});

export const GRADIENT = [
    "rgb(0, 42, 255)", // 0
    "rgb(133, 0, 231)", // 1
    "rgb(180, 0, 204)", // 2
    "rgb(211, 0, 175)", // 3
    "rgb(232, 0, 146)", // 4
    "rgb(244, 0, 118)", // 5
    "rgb(250, 0, 91)", // 6
    "rgb(250, 0, 66)", // 7
    "rgb(246, 0, 42)", // 8
    "rgb(238, 13, 13)", // 9
];

function App(props) {
    const [dataReceived, setDataReceived] = useState(false);
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/home">
                            <MainLayout Component={<LandingPage />} />
                        </Route>
                        <Route exact path="/maps">
                            <MainLayout Component={<MapContainer setDataReceived={setDataReceived} />} />
                        </Route>

                        <Route exact path="/calendar">
                            {dataReceived ? <MainLayout Component={<CalendarContainer />} /> : <Redirect to="/maps" />}
                        </Route>
                        <Route path="/">
                            <MainLayout Component={<LandingPage />} />
                        </Route>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        </ThemeProvider>
    )
}

export default App;