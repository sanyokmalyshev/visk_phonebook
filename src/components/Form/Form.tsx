import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from 'helpers/api';
import { useState } from 'react';
import { Contact } from 'types/contact';
import './Form.scss';
import { actions as ContactActions } from 'features/contacts';
import { useNavigate, useParams } from 'react-router-dom';
import { TouchedInputs } from 'types/touchedInputs';

const initForm: Contact = {
  name: '',
  lastName: '',
  address: '',
  city: '',
  country: '',
  email: [''],
  phoneNumber: [''],
};

const initTouchedInputs: TouchedInputs = {
  name: false,
  lastName: false,
  address: false,
  city: false,
  country: false,
  email: [],
  phoneNumber: [],
}


const Form = ({ mode }: {mode: string}) => {
  const [formData, setFormData] = useState<Contact>(initForm);
  const dispatch = useAppDispatch();
  const { contacts } = useAppSelector(state => state.contacts);
  const navigate = useNavigate();
  const [emailErrors, setEmailErrors] = useState([true]);
  const [touchedInputs, setTouchedInputs] = useState(initTouchedInputs);
  const [formValid, setFormValid] = useState(false);
  const { id } = useParams();


  useEffect(() => {
    const validValues = Object.keys(formData).every(key => {
      return formData[key as keyof Contact].length > 0
    });
    
    const validateEmails = emailErrors.every(value => value === false);
    const validatePhoneNumbers = formData.phoneNumber.every(value => value.length > 0);
  
    if (validValues && validateEmails && validatePhoneNumbers) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData, emailErrors]);

  useEffect(() => {
    if (mode === 'edit' && id) {
      setFormData(contacts[+id]);
      const emailErrors = contacts[+id].email.map(mail => false);
      setEmailErrors(emailErrors);
    }
  }, [contacts, mode, id])

  const onAddBtn = (type: string) => {  
    if (type === 'email' || type === 'phoneNumber') {
      setFormData({
        ...formData,
        [type]: [...formData[type], ''],
      });
    }

    if (type === 'email') {
      setEmailErrors([...emailErrors, true]);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i = 0) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email' || name === 'phoneNumber') {

      const inputData = [...formData[name]];
      inputData[i] = value;
      setFormData({
        ...formData,
        [name]: inputData,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === 'email') {
      validateEmail(value, i);
    }
  }

  const validateEmail = (value: string, i: number) => {
    let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const emailsErrors = [...emailErrors];
    emailsErrors[i] = emailValid === null ? true : false;
    setEmailErrors(emailsErrors);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(ContactActions.setLoading(true));
    let data: Contact[] = [];

    if (!contacts && mode === 'add') {
      data = [formData];
    }

    if (contacts && mode === 'add') {
      data = [...contacts, formData];
    }

    if (mode === 'edit' && id) {
      data = [...contacts];
      data[+id] = formData;
    }

    axios
      .put(baseUrl + 'contacts.json', data)
      .then(() => {
        dispatch(ContactActions.set(data));
        navigate('/');
      })
      .catch(() => {
        dispatch(ContactActions.setError('Unable to add data'));
      })
      .finally(() => {
        dispatch(ContactActions.setLoading(false));
      })
  }

  const handletouched = (name: string, i = 0) => {
    if (name === 'email' || name === 'phoneNumber') {
      const touched = [...touchedInputs[name]];
      touched[i] = true;
      setTouchedInputs({
        ...touchedInputs,
        [name]: touched,
      });
    } else {
      setTouchedInputs({
        ...touchedInputs, 
        [name]: true,
      });
    }
  }

  return (
    <form className={`Form needs-validation`} noValidate>
      <div className="form-group">
        <label htmlFor="name" className="Form__title">Name:</label>
        <input 
          type="text" 
          className={`
            form-control 
            ${touchedInputs.name 
              ? (!formData.name ? 'is-invalid' : 'is-valid') : null}`} 
          id="name" 
          name="name" 
          placeholder="Enter the Name" 
          onChange={handleChange}
          onBlur={(e) => handletouched(e.target.name)}
          value={formData.name}
          required
        />
        <div className="invalid-feedback">
          Please provide a name
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="lastName" className="Form__title">Last Name:</label>
        <input 
          type="text"
          className={`
            form-control 
            ${touchedInputs.lastName 
              ? (!formData.lastName ? 'is-invalid' : 'is-valid') : null}`}  
          id="lastName" 
          name="lastName" 
          placeholder="Enter the Last Name" 
          onChange={handleChange}
          onBlur={(e) => handletouched(e.target.name)}
          value={formData.lastName}
          required
        />
        <div className="invalid-feedback">
          Please provide a Last Name
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="address" className="Form__title">Address:</label>
        <input 
          type="text" 
          className={`
            form-control 
            ${touchedInputs.address 
              ? (!formData.address ? 'is-invalid' : 'is-valid') : null}`}  
          id="address" 
          name="address" 
          placeholder="Enter the Address" 
          onChange={handleChange}
          onBlur={(e) => handletouched(e.target.name)}
          value={formData.address}
          required
        />
        <div className="invalid-feedback">
          Please provide an Address
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="city" className="Form__title">City:</label>
        <input 
          type="text" 
          className={`
            form-control 
            ${touchedInputs.city 
              ? (!formData.city ? 'is-invalid' : 'is-valid') : null}`}   
          id="city" 
          name="city" 
          placeholder="Enter the City" 
          onChange={handleChange}
          value={formData.city}
          onBlur={(e) => handletouched(e.target.name)}
          required
        />
        <div className="invalid-feedback">
          Please provide a City
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="country" className="Form__title">Country:</label>
        <input 
          type="text" 
          className={`
            form-control 
            ${touchedInputs.country 
              ? (!formData.country ? 'is-invalid' : 'is-valid') : null}`}   
          id="country" 
          name="country" 
          placeholder="Enter the Country" 
          onChange={handleChange}
          value={formData.country}
          onBlur={(e) => handletouched(e.target.name)}
          required
        />
        <div className="invalid-feedback">
          Please provide a Country
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email" className="Form__title">Email:</label>  
        {formData.email.map((_, i) => {
          return (
            <div className="form-group" key={i} >
              <input
                type="email" 
                className={`
                  form-control 
                  Form__add
                  ${touchedInputs.email[i] 
                    ? (emailErrors[i] ? 'is-invalid' : 'is-valid') : null}`}   
                placeholder="Enter the Email" 
                name="email"
                id="email"
                onChange={(e) => handleChange(e, i)}
                value={formData.email[i]}
                onBlur={(e) => handletouched(e.target.name, i)}
                required
              />
              <div className="invalid-feedback">
                Please provide a valid email
              </div>
            </div>
          )
        })}
        <div className="form-group col-md-12 Form__button">
          <button 
              className="btn btn-primary Form__addButton" 
              type="button"
              onClick={() => {onAddBtn('email')}}
            >
              Add
          </button>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber" className="Form__title">Phone Number:</label>  
        {formData.phoneNumber.map((_, i) => {
          return (
            <div className="form-group col-md-12 Form__add" key={i} >
              <input
                type="number" 
                className={`
                  form-control 
                  Form__add
                  ${touchedInputs.phoneNumber[i] 
                    ? (!formData.phoneNumber[i] ? 'is-invalid' : 'is-valid') : null}`}   
                id="phoneNumber"
                placeholder="Enter the Phone Number" 
                name="phoneNumber" 
                onChange={(e) => handleChange(e, i)}
                value={formData.phoneNumber[i]}
                onBlur={(e) => handletouched(e.target.name, i)}
                required
              />
              <div className="invalid-feedback">
                Please provide a phone number
              </div>
            </div>
          )
        })}
        <div className="form-group col-md-12 Form__button">
          <button 
              className="btn btn-primary Form__addButton" 
              type="button"
              onClick={() => {onAddBtn('phoneNumber')}}
            >
              Add
          </button>
        </div>
      </div>
      <button 
        type="submit"
        className="btn btn-primary mb-2 Form__submit"
        onClick={handleSubmit}
        disabled={!formValid}
      >
        Save
      </button>
    </form>
  );
}

export default Form;
