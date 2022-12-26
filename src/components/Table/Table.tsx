import TableList from 'components/TableList/TableList';
import './Table.scss';
import { Loader } from 'components/Loader/Loader';
import { useAppSelector } from 'app/hooks';
import { Error } from 'components/Error/Error';

const tableFields = [
  'Name',
  'Last Name',
  'Address',
  'City',
  'Country',
  'Email',
  'Number',
  'Edit',
  'Delete',
];

function Table() {
  const { contacts, loading, error } = useAppSelector(state => state.contacts);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />
  }
  return (
    <>
      {contacts.length ? (
        <table className="Table">
        <thead>
          <tr>
            {tableFields.map(field => (
              <th
                className="Table__th" 
                key={ field }
              >{ field }</th>
            ))}
          </tr>
        </thead>
        <TableList />
      </table>
      ) : (
        <h1>No contacts yet</h1>
      )}
    </>
  );
}

export default Table;
