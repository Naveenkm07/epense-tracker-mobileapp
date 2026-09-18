import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/app/(auth)/login';

// Mock Clerk hooks
jest.mock('@clerk/expo', () => ({
  useSignIn: () => ({
    signIn: { create: jest.fn() },
    setActive: jest.fn(),
    isLoaded: true,
  }),
  useSignUp: () => ({
    signUp: { create: jest.fn(), prepareEmailAddressVerification: jest.fn() },
    setActive: jest.fn(),
    isLoaded: true,
  }),
}));

// Mock expo router
jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: jest.fn(), back: jest.fn() }),
}));

describe('LoginScreen UAT', () => {
  it('renders login form by default', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('switches to sign up mode', () => {
    const { getByText } = render(<LoginScreen />);
    
    const switchButton = getByText('Need an account? Sign Up');
    fireEvent.press(switchButton);
    
    expect(getByText('Sign Up')).toBeTruthy();
  });
});
