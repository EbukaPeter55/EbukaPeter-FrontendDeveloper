import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../api.config";
import { AppThunk } from "./store";

interface CapsuleState {
  capsules: any[];
  capsule: any;
  loading: boolean;
  currentPage?: number;
}

const initialState: CapsuleState = {
  capsules: [],
  capsule: {},
  loading: false,
  currentPage: 1
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
    getCapsule: (state) => {
      state.loading = true;
    },
    getCapsuleSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.capsule = action.payload;
    },
    getCapsuleFail: (state) => {
      state.loading = false;
    },
    getCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    
  },
});


export const {getCurrentPage, getCapsules, getCapsulesSuccess, getCapsulesFail, getCapsule, getCapsuleSuccess, getCapsuleFail } = capsule.actions;

// export const fetchSpaceXData = (limit: number, page: number, searchCriteria: any): AppThunk => async (dispatch: any) => {
//   dispatch(getCapsules()); // Dispatch the loading action
//   try {
//     // Construct the URL with search criteria
//     const { status, type, original_launch } = searchCriteria;
//     const url = `${BASE_URL}?limit=${limit}&page=${page}&search={"status": "${status}", "type": "${type}", "original_launch": "${original_launch}"}`;
//     const response = await axios.get(url);
//     dispatch(getCapsulesSuccess(response.data)); // Dispatch success action with the data
//     console.log('response', response);
//   } catch (error) {
//     console.error(error);
//     dispatch(getCapsulesFail()); // Dispatch failure action
//   }
// };

// export const fetchSpaceXData = (limit: number, page: number, searchCriteria: any): AppThunk => async (dispatch: any) => {
//   dispatch(getCapsules()); // Dispatch the loading action
//   try {
//     // Construct the URL without the search criteria if nothing is selected
//     const { status, type, original_launch } = searchCriteria;
//     let url = `${BASE_URL}?limit=${limit}&page=${page}`;
    
//     // Check if any search criteria are selected
//     if (status || type || original_launch) {
//       // Append the search criteria to the URL
//       url += `&search={"status": "${status}", "type": "${type}", "original_launch": "${original_launch}"}`;
//     }

//     const response = await axios.get(url);
//     dispatch(getCapsulesSuccess(response.data)); // Dispatch success action with the data
//     console.log('response', response);
//   } catch (error) {
//     console.error(error);
//     dispatch(getCapsulesFail()); // Dispatch failure action
//   }
// };

export const fetchSpaceXData = (limit: number, page: number, searchCriteria: any): AppThunk => async (dispatch: any) => {
  dispatch(getCapsules()); // Dispatch the loading action
  try {
    // Construct the URL without the search criteria if nothing is selected
    let url = `${BASE_URL}?limit=${limit}&page=${page}`;

    const { status, type, serial } = searchCriteria;

    // Create an object to store the selected search criteria
    const selectedCriteria: any = {};

    // Check if each field has a value and add it to the selectedCriteria object
    if (status) {
      selectedCriteria.status = status;
    }
    if (type) {
      selectedCriteria.type = type;
    }
    if (serial) {
      selectedCriteria.serial = serial;
    }

    // Check if there are any selected search criteria
    if (Object.keys(selectedCriteria).length > 0) {
      // Convert the selectedCriteria object to a JSON string and append it to the URL
      const searchCriteriaJSON = JSON.stringify(selectedCriteria);
      url += `&search=${encodeURIComponent(searchCriteriaJSON)}`;
    }

    const response = await axios.get(url);
    dispatch(getCapsulesSuccess(response.data)); // Dispatch success action with the data
    console.log('response', response);
  } catch (error) {
    console.error(error);
    dispatch(getCapsulesFail()); // Dispatch failure action
  }
};




export const fetchSpaceXDataDetails = (capsuleId: any): AppThunk => async (dispatch: any) => {
  console.log('Fetching details for capsule:', capsuleId); // Add this line
  dispatch(getCapsule()); // Dispatch the loading action
  try {
    const response = await axios.get(`${BASE_URL}?id=${capsuleId}`);
    console.log('capusule detail response', response)
    console.log('Fetched details:', response.data); // Add this line
    dispatch(getCapsuleSuccess(response.data)); // Dispatch success action with the data
    console.log('Capsule details updated in the state.'); // Add this line
  } catch (error) {
    console.error(error);
    dispatch(getCapsuleFail()); // Dispatch failure action
  }
};


export default capsule.reducer;
