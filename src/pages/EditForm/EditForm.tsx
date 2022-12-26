import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { actions as ContactActions } from 'features/contacts';
import './EditForm.scss';
import { Error } from 'components/Error/Error';
import Form from 'components/Form/Form';
import { Loader } from 'components/Loader/Loader';

export const EditForm = () => {
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
        <div className="EditForm">
          <h4 className="EditForm__title">
            Edit Contact
          </h4>
          <Form mode="edit" />
      </div>
      ) : (
        <Loader />
      )}
    </>
  );
}