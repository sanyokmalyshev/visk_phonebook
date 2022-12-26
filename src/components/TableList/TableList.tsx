import { useAppDispatch, useAppSelector } from 'app/hooks';
import axios from 'axios';
import { actions as ContactActions } from 'features/contacts';
import { baseUrl } from 'helpers/api';
import { Link } from 'react-router-dom';
import './TableList.scss';


const TableList = () => {
  const dispatch = useAppDispatch();
  const { contacts } = useAppSelector(state => state.contacts);

  const handleDelete = (i: number) => {
    let copyContacts = [...contacts];
    copyContacts.splice(i, 1);

    dispatch(ContactActions.delete(i));

    axios
      .put(baseUrl + 'contacts.json', copyContacts)
      .then(() => {
        console.log('done');
      })
      .catch(() => {
        dispatch(ContactActions.setError('Unable to delete data'));
      })
  }

  return (
    <tbody>
      {contacts.map((contact, index) => (
        <tr
          className="TableList__tr" 
          key={ index }
        >
          <td className="TableList__td">{contact.name}</td>
          <td className="TableList__td">{contact.lastName}</td>
          <td className="TableList__td">{contact.address}</td>
          <td className="TableList__td">{contact.city}</td>
          <td className="TableList__td">{contact.country}</td>
          <td className="TableList__td">
            {contact.email.map((mail, i) => (
              <span key={i}>{mail}<br /></span>
            ))}
          </td>
          <td className="TableList__td">
            {contact.phoneNumber.map((number, i) => (
              <span key={i}>{number}<br /></span>
            ))}
          </td>
          <td className="TableList__td">
            <Link to={`edit/${index}`} type="button" className="btn btn-primary">Edit</Link>
          </td>
          <td className="TableList__td">
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableList;
