import './AddContacts.scss';
import { Link } from "react-router-dom";

function AddContacts() {
  return (
    <div className="Addcontacts">
      <h4>Contacts</h4>
      <Link 
        to="add" 
        className="btn btn-primary"
      >
        Add contact
      </Link>
    </div>
  );
}

export default AddContacts;
