import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { map, mergeMap, tap, withLatestFrom, catchError } from "rxjs/operators";
import { defer, from, merge, of, EMPTY } from "rxjs";

export const ASYNC_STATUS_WAITING = 0;
export const ASYNC_STATUS_DONE = 1;

const asyncStatus = createSlice({
  reducers: {
    waiting: (state) => {
      state.status = ASYNC_STATUS_WAITING;
    },
    done: (state) => {
      state.status = ASYNC_STATUS_DONE;
    },
  },
  initialState: {
    status: 1,
  },
  slice: "asyncStatus",
  name: "asyncStatus",
});

export default asyncStatus;