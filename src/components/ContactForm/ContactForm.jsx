import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import { Input, Title } from './ContactForm.styled';
import Button from 'components/Button';

const ContactForm = ({ onSubmit, checkDuplicates }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (checkDuplicates(name)) {
      return;
    }

    onSubmit({ contact: { name, number } });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Box
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      as="form"
    >
      <label>
        <Title>Name</Title>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <Title>Number</Title>
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <Button type="submit">Add contact</Button>
    </Box>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  checkDuplicates: PropTypes.func.isRequired,
};
