import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Typography,
} from "@material-ui/core";
import { history } from '../redux';

const useStyles = makeStyles((theme) => ({
    root: ({ spacingWidth }) => ({
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        paddingTop: theme.spacing(spacingWidth),
        paddingBottom: theme.spacing(spacingWidth),
        zIndex: 100,
    }),
    mainButton: ({ mainButtonWidth }) => ({
        display: 'flex',
        width: `${mainButtonWidth}%`,
        justifyContent: "flex-start"
    }),
    otherHeaders: ({ mainButtonWidth }) => ({
        display: 'flex',
        width: `${100 - mainButtonWidth}%`,
        justifyContent: "flex-end",
    })
}));

export default function NavBar() {
    const styleConstants = {
        mainButtonWidth: 20,
        spacingWidth: 8,
    }
    const classes = useStyles(styleConstants);
    return (
        <div className={classes.root}>
            <div className={classes.mainButton}>
                <Button onClick={() => history.push('/')}>
                    <Typography variant="overline">
                        <strong>
                            Mag Lab
                        </strong>
                    </Typography>
                </Button>
            </div>
            <div className={classes.otherHeaders}>
                <Button onClick={() => history.push('/home')}>
                    <Typography variant="overline">
                        Home
                    </Typography>
                </Button>
                <Button onClick={() => history.push('/maps')}>
                    <Typography variant="overline">
                        Map
                    </Typography>
                </Button>
                {/* <Button onClick={() => history.push('/calendar')}>
                    <Typography variant="overline">
                        Calendar
                    </Typography>
                </Button> */}
                <Button>
                    <Typography variant="overline">
                        Sign up
                    </Typography>
                </Button>
            </div>
        </div>
    )
}