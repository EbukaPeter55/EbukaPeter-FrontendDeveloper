import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "./store";

interface CapsuleState {
  capsules: any[];
  loading: boolean;
}

const initialState: CapsuleState = {
  capsules: [],
  loading: false,
};

const capsule = createSlice({
  name: "capsule",
  initialState,
  reducers: {
    getCapsules: (state) => {
      state.loading = true;
    },
    getCapsulesSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.capsules = action.payload;
    },
    getCapsulesFail: (state) => {
      state.loading = false;
    },
  },
});

export const { getCapsules, getCapsulesSuccess, getCapsulesFail } = capsule.actions;

// Define an async thunk using AppThunk
export const fetchSpaceXData = (): AppThunk => async (dispatch:any) => {
  dispatch(getCapsules()); // Dispatch the loading action

  try {
    const response = await axios.get(
      'https://0961-2a09-bac5-4da3-15c3-00-22b-2d.ngrok-free.app/sociopay/test2.php'
    );
    dispatch(getCapsulesSuccess(response.data)); // Dispatch success action with the data
    console.log('response', response);
  } catch (error) {
    console.error(error);
    dispatch(getCapsulesFail()); // Dispatch failure action
  }
};

export default capsule.reducer;
