import PropTypes from 'prop-types';
import css from 'components/ContactList/ContactList.module.css';

export const ContactList = ({ onDeleteContact, contacts }) => {
  const deleteData = (evt, contactId) => {
    onDeleteContact(contactId);
  };

  return (
    <ul>
      {contacts.map(contact => {
        return (
          <div key={contact.id}>
            <li className={css.listEl}>
              {contact.name}: {contact.number}
              <button
                type="button"
                onClick={evt => deleteData(evt, contact.id)}
                className={css.delBtn}
              >
                Delete
              </button>
            </li>
          </div>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
