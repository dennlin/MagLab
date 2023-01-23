import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import MainPage from "./MainPage";
import MissionPage from "./MissionPage";

const useStyles = makeStyles((theme) => ({
    root: () => ({
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    }),
}));


export default function MainPages() {
    const classes = useStyles();
    return (
        <div className = {classes.root}>
            <MainPage />
            <MissionPage />
        </div>
    )
}