import { createSlice } from '@reduxjs/toolkit';
import { Contact } from 'types/contact';
import type { PayloadAction } from '@reduxjs/toolkit';

type ContactsState = {
  contacts: Contact[];
  loading: boolean;
  error: string;
};

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: '',
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    set: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    delete: (state, action: PayloadAction<number>) => {
      state.contacts.splice(action.payload, 1);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
})

export default contactSlice.reducer;
export const { actions } = contactSlice;