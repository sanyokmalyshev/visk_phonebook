import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { Error } from 'components/Error/Error';
import Form from 'components/Form/Form';
import { Loader } from 'components/Loader/Loader';
import { actions as ContactActions } from 'features/contacts';
import './AddForm.scss';

function AddForm() {
  const { loading, error } = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(ContactActions.setError(''));
    }
  }, [dispatch]);

  if (error) {
    return <Error />
  }

  return (
    <>
      {!loading ? (
        <div className="AddForm">
          <h4 className="AddForm__title">
            Register new Contact
          </h4>
          <Form mode="add" />
      </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default AddForm;
