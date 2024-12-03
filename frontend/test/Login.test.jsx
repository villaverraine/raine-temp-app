import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/pages/Login';
import { AppContextProvider } from '../src/context/AppContext';
import axios from 'axios';

// Mock dependencies
vi.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('renders the login form correctly', () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    // Check for essential elements
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByLabelText('Email or Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    const passwordField = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    // Initially, password field is of type 'password'
    expect(passwordField).toHaveAttribute('type', 'password');

    // Click to toggle visibility
    fireEvent.click(toggleButton);
    expect(passwordField).toHaveAttribute('type', 'text');

    // Click to toggle back
    fireEvent.click(toggleButton);
    expect(passwordField).toHaveAttribute('type', 'password');
  });

  it('displays success message on successful login', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        user: {
          _id: '123',
          username: 'testuser',
          name: { first: 'Test', last: 'User' },
          email: 'test@example.com',
          contactNumber: '123456789',
        },
        token: 'fake-token',
      },
    });

    render(
      <MemoryRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    // Fill in the form and submit
    fireEvent.change(screen.getByLabelText('Email or Username'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('LOGIN'));

    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Login successful! Redirecting...')).toBeInTheDocument();
    });
  });

  it('displays error message on failed login', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(
      <MemoryRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    // Fill in the form and submit
    fireEvent.change(screen.getByLabelText('Email or Username'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText('LOGIN'));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});