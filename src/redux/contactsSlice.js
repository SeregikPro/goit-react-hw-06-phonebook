import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.items.push(payload);
    },
    removeContact: (state, { payload }) => {
      state.items = state.items.filter(({ id }) => id !== payload);
    },
    filterContacts: (state, { payload }) => {
      const index = state.items.findIndex(({ id }) => id === payload);
      if (index > -1) {
        state.items[index] = {
          ...state.items[index],
          isOnline: state.items[index].isOnline === 'yes' ? 'no' : 'yes',
        };
      }
    },
  },
});

export const { addContact, removeContact, filterContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;

export const getContacts = state => state.items;
