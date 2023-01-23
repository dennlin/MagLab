import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { mergeMap, withLatestFrom } from "rxjs/operators";
import { from, merge, of } from "rxjs";
import api from "../apis/apiClient";
import { allDataFormatter } from "../util/util";
import fileDownload from 'js-file-download'

const magData = createSlice({
    reducers: {
        triggerIndividualData: (state, { sensorId }) => {
            state.individualSensorId = sensorId;
        },

        triggerAllData: () => {
        },

        triggerDownloadData: (state, { sensorId }) => {
            state.individualSensorId = sensorId;
        },

        setAllData: (state, { payload }) => {
            state.allData = allDataFormatter(payload, true);
        },

        setIndividualMagData: (state, { payload }) => {
            state.individualMagData = allDataFormatter(payload, true);
        },

        setDataReceived: (state, { payload }) => {
            console.log('payload data received', payload);
            state.dataReceived = payload;
        }
    },
    initialState: {
        allData: [],
        individualMagData: [],
        individualSensorId: 0,
        numSensors: 0,
        dataReceived: false,
    },
    name: "magData",
    slice: "magData",
});

export default magData;


export const getAllData = (action$, state$) =>
    action$.pipe(
        ofType(magData.actions.triggerAllData),
        withLatestFrom(state$),
        mergeMap(() =>
            from(api.get(`/api/newData`)).pipe(
                mergeMap(res => {
                    return merge(
                        //returns sensor data in a json object
                        // {sensor1: {}, sensor2: {}...}
                        of(
                            magData.actions.setAllData(res.data)
                        ),
                    );
                })
            )
        )
    );


export const getIndividualData = (action$, state$) =>
    action$.pipe(
        ofType(magData.actions.triggerIndividualData),
        withLatestFrom(state$),
        mergeMap(([{ payload }]) => {
            let sensorId = payload;
            return from(api.get(`/api/magData?sensorId=${sensorId}`)).pipe(
                mergeMap(res => {
                    return merge(
                        //returns sensor data in a json object
                        // {sensor1: {}, sensor2: {}...}
                        of(
                            magData.actions.setIndividualMagData(res.data)
                        ),
                    );
                })
            )
        })
    );

export const getLatestDownloadData = (action$, state$) =>
    action$.pipe(
        ofType(magData.actions.triggerDownloadData),
        withLatestFrom(state$),
        mergeMap(([{ payload }]) => {
            let sensorId = payload;
            return from(api.get(`/api/downloadData?magId=${sensorId}&date=${-1}`)).pipe(
                mergeMap(res => {
                    fileDownload(res.data, `pni_${sensorId}`);
                })
            )
        })
    );