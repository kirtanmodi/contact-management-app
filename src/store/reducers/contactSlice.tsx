import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ContactState {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

const initialState: ContactState[] = [];

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactState>) => {
      state.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
    editContact: (state, action: PayloadAction<ContactState>) => {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state[index] = action.payload;
    },
  },
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;

export default contactSlice.reducer;
