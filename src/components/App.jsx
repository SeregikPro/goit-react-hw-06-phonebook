import React from 'react';
import { Box } from './Box';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeContact,
  setFilter,
  getContacts,
  getFilter,
} from 'redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const handleFilter = e => {
    dispatch(setFilter(e.target.value.toLowerCase()));
  };

  const filteredContacts = () =>
    contacts.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()));

  const deleteContact = id => {
    dispatch(removeContact({ id }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={5}>
      <h1>Phonebook</h1>
      <Box
        width="300px"
        textAlign="center"
        border="normal"
        borderColor="accent"
        borderRadius="normal"
        p={4}
      >
        <ContactForm />
      </Box>
      <Box width="300px">
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilter} />
        <ContactList values={filteredContacts()} handleDelete={deleteContact} />
      </Box>
    </Box>
  );
};

export default App;
