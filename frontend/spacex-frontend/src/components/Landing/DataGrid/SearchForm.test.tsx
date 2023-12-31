import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SearchForm from "./SearchForm.component";
import "@testing-library/jest-dom";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  capsule: {
    capsules: [],
    loading: false,
  },
};

describe("SearchForm Component", () => {
  it("renders SearchForm component", () => {
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );
  });
});
