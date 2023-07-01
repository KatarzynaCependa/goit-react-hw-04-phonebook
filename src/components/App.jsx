import { nanoid } from 'nanoid';
import css from 'components/App.module.css';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useState, useEffect } from 'react';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
  name: '',
  number: '',
};

export const App = () => {
  const [contactsData, setContactsData] = useState(INITIAL_STATE);
  const [filter, setfilter] = useState('');

  useEffect(() => {
    setContactsData(JSON.parse(localStorage.getItem('contacts')));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contactsData));
  }, [contactsData]);

  const addNewName = (name, number) => {
    const contactNames = contactsData.contacts.map(contact => contact.name);

    if (contactNames.includes(name))
      return alert(`${name} is alredy in contacts`);

    setContactsData(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          name,
          number,
          id: nanoid(),
        },
      ],
    }));
  };

  const showFilteredContacts = () => {
    return contactsData.contacts.filter(cont =>
      cont.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = contactId => {
    setContactsData(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));

    localStorage.removeItem('contacts');
  };

  const handleFilterChange = newValue => {
    setfilter(newValue);
  };

  return (
    <>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onSubmit={addNewName} />
      <h2 className={css.header}>Contacts</h2>
      <Filter onChange={handleFilterChange} />
      <ContactList
        contacts={showFilteredContacts()}
        onClick={handleDeleteContact}
      />
    </>
  );
};
