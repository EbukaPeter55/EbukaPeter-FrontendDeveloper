import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import DataSpaceX from "./DataSpaceX.component";
import { MOCK_DATA } from "./data";
import "@testing-library/jest-dom";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  capsule: {
    capsules: [],
    loading: false,
  },
};

describe("DataSpaceX Component", () => {
  it("renders DataSpaceX component", () => {
    const store = mockStore(initialState);

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <DataSpaceX
          capsules={MOCK_DATA}
          currentPage={1}
          onPageChange={() => {}}
          setSearchCriteria={() => {}}
          searchCriteria={{ status: "", type: "", serial: "" }}
        />
      </Provider>
    );
  });
});
