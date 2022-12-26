import './App.scss';
import { useCallback, useEffect } from 'react';
import Header from './components/Header/Header';
import Home from 'pages/Home';
import { Routes, Route } from 'react-router-dom';
import AddForm from 'pages/AddForm/AddForm';
import { actions as ContactActions } from 'features/contacts';
import { useAppDispatch } from 'app/hooks';
import axios from "axios";
import { baseUrl } from 'helpers/api';
import { Contact } from 'types/contact';
import { EditForm } from 'pages/EditForm/EditForm';

function App() {
  const dispatch = useAppDispatch();

  const getData = useCallback(async () => {
    dispatch(ContactActions.setLoading(true));
    try {
      const { data } = await axios.get<Contact[]>(
        baseUrl + 'contacts.json'
      );
      console.log(data);
      
      dispatch(ContactActions.set(data || []));

    } catch (error) {
      dispatch(ContactActions.setError('Unable to load data'));
    }
    dispatch(ContactActions.setLoading(false));
  }, [dispatch])

  useEffect(() => {
    getData();
  }, [getData, dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="container col-8">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='add' element={<AddForm />}></Route>
          <Route path='edit/:id' element={<EditForm />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
