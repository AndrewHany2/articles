import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import TextField from '../components/TextInput';
import { Formik } from 'formik';
import { Meteor } from 'meteor/meteor';
import { Form, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';

interface MyFormValues {
  username: string;
  password: string;
}
const initialValues: MyFormValues = { username: '', password: '' };
const schema = Yup.object().shape({
  username: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const LoginForm  = () => {
    const user = useTracker(() => Meteor.user());
    useEffect(()=> {
      if(user) navigate("/")
    }, [user]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    return ( <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={values => {
                // same shape as initial values
                setLoading(true);
                Meteor.loginWithPassword(values.username, values.password,(err) => {
                  if (err) {
                      console.log(err);
                      setError(err.reason);
                       setLoading(false);
                  } else {
                      navigate("/");
                      setLoading(false);
                  }
                });
            }}
     >
       {({  
            errors,
            values,
            handleSubmit,
            handleChange
         }) => ( <Form noValidate onSubmit={handleSubmit}>
                <div>
                    <div>
                        <TextField
                            label="Name"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            value={values.username}
                            className="mb-3"
                            required
                            error={errors.username}
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
                    Login
                </Button>
            </Form>
       )}
     </Formik>
    )
}

export default LoginForm;
