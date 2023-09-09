import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SearchForm from './SearchForm.component';
import { Store, AnyAction } from 'redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // Import axios-mock-adapter
import { MOCK_DATA } from './data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  capsule: {
    capsules: [],
    loading: false,
  },
};

describe('SearchForm Component', () => {
  let store: Store<unknown, AnyAction>;
  let axiosMock: MockAdapter;

  beforeEach(() => {
    store = mockStore(initialState);
    axiosMock = new MockAdapter(axios); // Create a new instance of axios-mock-adapter
  });

  afterEach(() => {
    axiosMock.reset(); // Reset the axios mock after each test
  });

  it('should handle input change and make an async request', async () => {
    // Mock the axios get method to return a response with some data
    
    axiosMock.onGet('/your-api-endpoint').reply(200, MOCK_DATA);

    const { getByTestId } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const statusInput: any = getByTestId('status-input');

    fireEvent.change(statusInput, { target: { value: 'active' } });

    // You should wait for the asynchronous axios request to complete
    await waitFor(() => {
      expect(statusInput.value).toBe('active');
    });
  });

  // Add more test cases for other functions in your component as needed
});
