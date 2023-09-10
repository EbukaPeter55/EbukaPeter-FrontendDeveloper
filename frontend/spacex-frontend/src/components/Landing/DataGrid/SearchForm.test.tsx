import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SearchForm from './SearchForm.component';
import '@testing-library/jest-dom';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  capsule: {
    capsules: [],
    loading: false,
    // Add other capsule-related state properties here if needed
  },
};

describe('SearchForm Component', () => {
  it('renders SearchForm component', () => {
    const store = mockStore(initialState); // Create a mock store with initial state

    const { getByTestId } = render(
      <Provider store={store}> {/* Wrap your component with Provider */}
        <SearchForm />
      </Provider>
    );

    // Your test assertions here
  });
});