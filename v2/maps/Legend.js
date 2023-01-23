import React from "react";
import { GRADIENT } from '../../AppV2';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    colorBox: {
        display: 'flex',
        alignSelf: 'center',
        height: theme.spacing(2),
        width: theme.spacing(4),
    },
}));

export default function Legend() {
    const classes = useStyles();
    let fontSize = 10;
    return (
        <div className={classes.root}>
            <Typography style={{ fontSize: fontSize, marginRight: '2px' }}>
                Low Sensor Availability
            </Typography>
            {GRADIENT.map((val, ind) => { return <div key={ind} style={{ background: val }} className={classes.colorBox} /> })}
            <Typography style={{ fontSize: fontSize, marginLeft: '2px' }}>
                High Sensor Availability
            </Typography>
        </div >
    )
}