import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { describe, beforeEach, it, expect } from '@jest/globals';
// import DataSpaceX from '../DataSpaceX.component';
import DataSpaceX from '../DataSpaceX.component';


describe('DataSpaceX component', () => {
    let component: RenderResult;
  
    beforeEach(() => {
    //   component = render(<DataSpaceX />);
    });
  
    it('renders without errors', () => {
      // You can add more specific assertions here
      expect(component).toBeDefined();
    });
  
    it('opens the modal when a card is clicked', () => {
      const card = screen.getByText('Your card text here'); // Update with your card text
      fireEvent.click(card);
  
      // Assert that the modal is open
      const modal = screen.getByText('Are you sure you want to delete signatory?');
    //   expect(modal).toBeInTheDocument();
    });
  
    // Add more test cases as needed
  });
