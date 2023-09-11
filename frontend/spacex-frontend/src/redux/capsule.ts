import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../api.config";
import { AppThunk } from "./store";
import { MockData } from "./types/capsules";

interface CapsuleState {
  capsules: MockData[];
  capsule: any;
  loading: boolean;
  currentPage?: number;
}

const initialState: CapsuleState = {
  capsules: [],
  capsule: {},
  loading: false,
  currentPage: 1,
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

export const {
  getCurrentPage,
  getCapsules,
  getCapsulesSuccess,
  getCapsulesFail,
  getCapsule,
  getCapsuleSuccess,
  getCapsuleFail,
} = capsule.actions;

export const fetchSpaceXData =
  (limit: number, page: number, searchCriteria: any): AppThunk =>
  async (dispatch: any) => {
    dispatch(getCapsules());
    try {
      let url = `${BASE_URL}?limit=${limit}&page=${page}`;

      const { status, type, serial } = searchCriteria;

      const selectedCriteria: any = {};

      if (status) {
        selectedCriteria.status = status;
      }
      if (type) {
        selectedCriteria.type = type;
      }
      if (serial) {
        selectedCriteria.serial = serial;
      }

      if (Object.keys(selectedCriteria).length > 0) {
        const searchCriteriaJSON = JSON.stringify(selectedCriteria);
        url += `&search=${encodeURIComponent(searchCriteriaJSON)}`;
      }
      const response = await axios.get(url);
      dispatch(getCapsulesSuccess(response.data));
    } catch (error) {
      dispatch(getCapsulesFail());
    }
  };

export const fetchSpaceXDataDetails =
  (capsuleId: any): AppThunk =>
  async (dispatch: any) => {
    dispatch(getCapsule());
    try {
      const response = await axios.get(`${BASE_URL}?id=${capsuleId}`);
      dispatch(getCapsuleSuccess(response.data));
    } catch (error) {
      dispatch(getCapsuleFail());
    }
  };

export default capsule.reducer;
