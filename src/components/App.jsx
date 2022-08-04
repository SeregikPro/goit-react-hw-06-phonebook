import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './Box';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import useLocalStorage from 'hooks/UseLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const handleContactSubmit = ({ contact: { name, number } }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(contacts => [...contacts, newContact]);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleFilter = e => setFilter(e.currentTarget.value.toLowerCase());

  const checkDuplicates = name => {
    const allContactNames = contacts.map(contact => contact.name);

    if (allContactNames.includes(name)) {
      alert(`${name} is already in contacts.`);
      return true;
    }
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
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
        <ContactForm
          onSubmit={handleContactSubmit}
          checkDuplicates={checkDuplicates}
        />
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
