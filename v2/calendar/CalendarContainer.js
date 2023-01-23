import React, { useEffect } from 'react';
import CalendarAwesome from './Calendar';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.primary.main,
    },
    titleText: {
        fontSize: 25,
        marginBottom: theme.spacing(4),
    },
    aboveMap: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'center',
    },
    calendarSizeContainer: {
        width: "80%",
        // height:"50%",
    }
}));

export default function CalendarContainer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.aboveMap}>
                <Typography variant='h1' className={classes.titleText}>
                    <strong>
                        Calendar
                    </strong>
                </Typography>
            </div>
            <div>
                <Typography variant="subtitle1" style={{fontSize:13}}>
                    Click on an event to download the PNI data!
                </Typography>
            </div>
            <div className={classes.calendarSizeContainer}>
                <CalendarAwesome />
            </div>
        </div>
    )
}