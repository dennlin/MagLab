/* global google */
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import "./styles.css";
import Marker from './Marker';
import {
  Card,
  CardContent,
  Typography,
  Slide,
  IconButton,
  Button
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import GRADIENT from '../../AppV2';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import magData from '../redux/magData/magData';
import { history } from '../redux';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: "2em",
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    // top: "35%", 
    // left: "5%",
    height: "50%",
    width: "25%",
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  headerText: {
    fontSize: 15,
    color: "light gray",
  },
  titleText: {
    fontSize: 25,
  },
  closeButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: 'flex',
    justifyContent: "flex-start",
  },
  buttonContainer: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  }
}));


function Map(props) {
  let mapGlobal, heatmap;
  const [heatmapOn, setHeatmapOn] = useState(true);
  const [checked, setChecked] = useState(false);
  const [currMarkerId, setCurrMarkerId] = useState();
  const [currMarkerName, setCurrMarkerName] = useState();
  //plotPoints - {lat, long, weight}

  useEffect(() => {
    props.triggerAllData();
  }, []);

  const setOpenMarker = (markerId, markerName) => {
    if (markerId === currMarkerId && checked) {
      setChecked(false);
    }
    else {
      setChecked(true);
      setCurrMarkerId(markerId);
      setCurrMarkerName(markerName);
    }
  }

  const MarkerCard = () => {
    const classes = useStyles();
    return (
      <Slide direction="right" in={checked} container={mapGlobal} mountOnEnter unmountOnExit>
        <Card className={classes.root}>
          <div className={classes.closeButton}>
            <IconButton onClick={() => setChecked(false)} size="small"><CloseIcon /></IconButton>
          </div>
          <CardContent className={classes.title}>
            <Typography variant='subtitle1' className={classes.headerText}>
              Station Info.
            </Typography>
            <Typography variant='h1' className={classes.titleText} align="left">
              {currMarkerName}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" align='center'>
              Station Id: {currMarkerId}
            </Typography>
            <div className = {classes.buttonContainer}>
              <Button variant="outlined" className = {classes.button} onClick={() => {
                props.triggerIndividualData(currMarkerId);
                history.push("/calendar");
              }}>
                Go to calendar
              </Button>
              <Button variant="outlined" className = {classes.button} onClick={() => {
                props.triggerDownloadData(currMarkerId)
              }}>
                Download latest data
              </Button>
            </div>
          </CardContent>
        </Card>
      </Slide>
    )
  }

  return (
    <div className="App">
      {/* <Button variant="outlined" onClick={() => {
        setHeatmapOn(!heatmapOn);
        heatmap.set(mapGlobal);
      }}
      >
        Toggle Heatmap
      </Button> */}
      <MarkerCard />
      <GoogleMapReact
        gradient={GRADIENT}
        ref={(el) => mapGlobal = el}
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyC99o1QEigKpPaGQimzKsM3w6bbotM3CL4",
          language: "en",
          region: "US",
          libraries: 'visualization',
        }}
        defaultCenter={{ lat: 42.2808, lng: -83.732124 }}
        defaultZoom={3}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => {
        //   heatmap = new maps.visualization.HeatmapLayer({
        //     data: points.map(point => (
        //       {
        //         location: new maps.LatLng(point['lat'], point['lng']),
        //         weight: point['weight'],

        //       }))
        //   });
        //   heatmap.set("gradient", gradient);
        //   mapGlobal = map;
        //   heatmap.setMap(map);
        // }}
        options={map => ({
          streetViewControl: true,
          draggable: true, // make map draggable
          zoomControlOptions: { position: 9 },
          keyboardShortcuts: true, // keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: true, // allow scroll wheel
          mapTypeId: map.MapTypeId.ROADMAP, //default map style
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: map.MapTypeControlStyle.HORIZONTAL_BAR, //style of map control
            position: map.ControlPosition.TOP_LEFT, //location of map type controls
            mapTypeIds: [
              map.MapTypeId.ROADMAP,
              map.MapTypeId.TERRAIN, //roadmap w/ terrain illustrations
              map.MapTypeId.SATELLITE, //pure satellite
              map.MapTypeId.HYBRID //satellite w/ roads
            ]
          },
        })}
      >
        {props.allData.map(({ lat, long, username, id, pniFilename }) => {
          console.log(id, username);
          return (
            <Marker key={id} lat={lat} lng={long} markerId={id} title={username} weight={pniFilename} openInfo={setOpenMarker} />
          );
        })}
      </GoogleMapReact>
    </div >
  )
}

export default connect(
  (state) => ({
    allData: state.magData.allData,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        triggerAllData: magData.actions.triggerAllData,
        triggerIndividualData: magData.actions.triggerIndividualData,
        triggerDownloadData: magData.actions.triggerDownloadData,
      },
      dispatch
    )
)(Map);