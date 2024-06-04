import * as React from 'react';
import {
  Formik,
} from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import TextField from '../components/TextInput';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from "react-router-dom";


interface MyFormValues {
    name: string;
    email: string;
    password: string;
  }

const initialValues: MyFormValues = { name:'', email: '', password: '' };
const schema = Yup.object().shape({
    name: Yup.string().required().min(5).max(10),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });

const RegisterForm = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    return (<div>
        <h1>Register</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={values => {
                // same shape as initial values
                setLoading(true);
                Accounts.createUser({
                     username: values.email,
                     email: values.email,
                     password: values.password,
                     profile: values.name
                    }, (err) => {
                        if (err) {
                            console.log(err);
                            setError(err.reason);
                        setLoading(false);
                        } else {
                            navigate("/");
                            setLoading(true);
                        }
                  });
            }}
     >
       {({  
            errors,
            values,
            touched,
            handleSubmit,
            handleChange
         }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <div>
                    <div>
                        <TextField
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={values.name}
                            className="mb-3"
                            required
                            error={errors.name}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={values.email}
                            className="mb-3"
                            required
                            error={errors.email}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={values.password}
                            className="mb-3"
                            required
                            error={errors.password}
                        />
                    </div>
                    <div className='mb-3'>
                        <div style={{color:"red"}}>
                            {error}
                        </div>
                    </div>
                </div>
                <Button type="submit" disabled={loading}>
                    Submit
                </Button>
            </Form>
       )}
     </Formik>
      </div>)
}
export default RegisterForm;