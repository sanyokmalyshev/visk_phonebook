import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <div className="Header">
      <Link to="/" className="Header__title">Phonebook</Link>
    </div>
  );
}

export default Header;
