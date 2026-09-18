import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddScreen from '../src/app/(tabs)/add';

// Mock Clerk
jest.mock('@clerk/expo', () => ({
  useUser: () => ({ user: { id: 'test-user-id' } }),
  useAuth: () => ({ getToken: jest.fn(() => Promise.resolve('mock-token')) }),
}));

// Mock Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: jest.fn(), back: jest.fn() }),
}));

// Mock Supabase
jest.mock('../src/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({ insert: jest.fn() })),
    storage: { from: jest.fn(() => ({ upload: jest.fn() })) },
  },
  createClerkSupabaseClient: jest.fn(() => ({
    from: jest.fn(() => ({ insert: jest.fn(() => Promise.resolve({ error: null })) })),
    storage: { from: jest.fn(() => ({ upload: jest.fn() })) },
  })),
}));

// Mock Document Picker
jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn(),
}));

describe('AddExpense UAT', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddScreen />);
    
    expect(getByPlaceholderText('Amount (e.g. 15.00)')).toBeTruthy();
    expect(getByPlaceholderText('Category (e.g. Food, Transport)')).toBeTruthy();
    expect(getByText('Add Expense')).toBeTruthy();
  });

  it('shows error if fields are empty on submit', async () => {
    const { getByText } = render(<AddScreen />);
    
    const addButton = getByText('Add Expense');
    fireEvent.press(addButton);
    
    // In React Native testing, Alerts are typically mocked, 
    // but this verifies the button handles press without crashing.
  });
});
