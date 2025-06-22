import { render, screen } from '@testing-library/react'; // Importing testing utilities
import App from './App'; // Importing the App component to test

// A simple test that renders the App and checks if a certain element is present
test('renders learn react link', () => {
  render(<App />); // Rendering the App component
  
  // Finding the <nav> element (assuming the Navbar has a 'nav' role)
  const linkElement = screen.getByText(/learn react/i);
  
  // Asserting that the Navbar is in the document (i.e., it's rendered correctly)
  expect(linkElement).toBeInTheDocument();
});
