import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
} from "@material-ui/core";
import { history } from '../redux';
import { StyledButton } from "../util/StyledComponents";

const useStyles = makeStyles((theme) => ({
    root: () => ({
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: '80vh',
    }),
    title: ({ textBoxWidth }) => ({
        display: 'flex',
        alignItems: "flex-end",
        justifyContent: 'flex-start',
        height: "30%",
        width: textBoxWidth,
    }),
    titleText: () => ({
        fontSize: 35,
        fontWeight: 'bold',
    }),
    body: ({ textBoxWidth }) => ({
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: theme.spacing(5),
        width: textBoxWidth,
        height: "70%",
    }),
    button: ({ }) => ({
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "0.75em",
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
        color: theme.palette.primary.light,
        zIndex: 0,
    }),
    buttonText: ({ }) => ({
        fontSize: 12,
    })
}));


export default function MainPage() {
    const styleConstants = {
        textBoxWidth: "50%",
    }
    const classes = useStyles(styleConstants);
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h1" className={classes.titleText}>
                    <strong>
                        Welcome to Mag Lab!
                    </strong>
                </Typography>
            </div>
            <div className={classes.body}>
                <Typography variant="body1" style={{ fontSize: 13 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                </Typography>
                <StyledButton className={classes.button} onClick={() => history.push("/maps")}>
                    <Typography variant="body1" className={classes.buttonText}>
                        Observe Data
                    </Typography>
                </StyledButton>
            </div>

        </div>
    )
}
