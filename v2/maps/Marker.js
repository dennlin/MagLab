import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GRADIENT } from '../../AppV2';

const useStyles = makeStyles(theme => ({
    circle: ({ color }) => ({
        backgroundColor: color,
        borderRadius: "50%",
        color: "#fff",
        height: "1em",
        width: "1em",
        position: "relative",
        border: "1px solid transparent",
    }),
    circleHover: {
        backgroundColor: "#0078d4",
        borderRadius: "50%",
        color: "#fff",
        height: "1em",
        width: "1em",
        position: "relative",
        border: "1px solid transparent",
    },
    circleText: {
        textAlign: "center",
        height: "70%",
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
    },
}
));

const Marker = ({ markerId, title, $hover, openInfo, weight }) => {
    const handleClick = () => {
        openInfo(markerId, title);
    };
    const styleConstants = {
        color: GRADIENT[weight],
    }
    const classes = useStyles(styleConstants);

    return (
        <div className={$hover ? classes.circleHover : classes.circle} onClick={handleClick}>
            <span className={classes.circleText} title={title}>
                {/* {markerId} */}
            </span>
        </div>
    );
};

export default Marker;
