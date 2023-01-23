import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: () => ({
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: '80vh',
        backgroundColor: theme.palette.primary.main,
    }),
    title: ({ textBoxWidth }) => ({
        display: 'flex',
        alignItems: "flex-start",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: textBoxWidth,
    }),
    titleText: () => ({
        fontSize: 35,
        fontWeight: 'bold',
    }),
    titleDescription: () => ({
        marginTop: theme.spacing(3),
        width:"80%",
    }),
    image: () => ({
        display: "flex",
        justifyContent: "center",
        width: "80%",
        flexWrap: "wrap",
        maxWidth: "400px", /* whatever you desire */
        marginLeft: "auto", /* center the container */
        marginRight: "auto", /* center the container */
    }),
    imageContainer: ({ imageContainerWidth }) => ({
        width: imageContainerWidth,
    }),
}));


export default function MissionPage() {
    const styleConstants = {
        textBoxWidth: "50%",
        imageContainerWidth: "50%",
    }
    const classes = useStyles(styleConstants);
    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
                <img alt="MagLab logo" className={classes.image} src="/magLabPhoto.png"></img>
            </div>
            <div className={classes.title}>
                <Typography variant="h1" className={classes.titleText}>
                    <strong>
                        Our Mission
                    </strong>
                </Typography>
                <div className = {classes.titleDescription}>
                    <Typography variant="body1" style={{ fontSize: 13 }}>
                        Neque porro quisquam est, qui dolorem ipsum quia
                        dolor sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi tempora incidunt ut labore et
                        dolore magnam aliquam quaerat voluptatem. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum.
                    </Typography>
                </div>
            </div>
        </div>
    )
}