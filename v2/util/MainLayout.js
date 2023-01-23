import React from "react";
import NavBar from "../topBar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
/**
 * Function used to create the main layout of the application
 */

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
    },
    topBar: {
        position: 'sticky',
        top: "0px",
        width: "100%",
        backgroundColor: theme.palette.primary.light,
    },
}));

export default function MainLayout({ Component }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.topBar}>
                <NavBar />
            </div>
            {Component}
        </div>
    );
}