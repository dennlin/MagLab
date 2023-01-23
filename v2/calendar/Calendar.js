import React from "react";
import './styles.css';
import { connect } from "react-redux";
import Legend from "../maps/Legend";
import ReactTooltip from 'react-tooltip';
import Calendar from "react-awesome-calendar";
import { GRADIENT } from "../../AppV2";
import { bindActionCreators } from "redux";
import magData from '../redux/magData/magData';

function CalendarAwesome(props) {
    console.log("MAGDATA", props.magData);
    let myEvents = props.magData.map((mag) => {
        return {
            "id": mag.id,
            "color": GRADIENT[mag.pniFilename],
            "from": mag.datetime,
            "to": mag.datetime,
            "title": mag.username
        }
    });
    console.log('myevents', myEvents);

    return (
        <div>
            <div>
                <Calendar
                    events={myEvents}
                    onClickEvent = {(event) => {
                        console.log(event);
                        props.triggerDownloadData(event);
                    }}
                />
            </div>
            <Legend />
            <ReactTooltip />
        </div>
    )
}


export default connect(
    (state) => ({
        magData: state.magData.individualMagData,
    }),
    (dispatch) =>
    bindActionCreators(
      {
        triggerDownloadData: magData.actions.triggerDownloadData,
      },
      dispatch
    )
)(CalendarAwesome);