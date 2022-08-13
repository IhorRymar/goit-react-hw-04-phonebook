import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import ContactForm from './Phonebook/ContactForm';
import ContactList from './Phonebook/ContactList';
import ContactFilter from './Phonebook/ContactFilter';
import css from './Phonebook/ContactsStyle.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name === name)
      ? alert(`${name}`, 'This user is already in the contact list.', 'OK')
      : setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const getVisibleContact = () => {
    const normalizedfilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  return (
    <div>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm onSubmit={addContacts} />
      <h3 className={css.title}>Contacts</h3>
      <ContactFilter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContact()}
        onDeleteContact={deleteContact}
      ></ContactList>
    </div>
  );
};

export default App;
