import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";
import AuthContext from '../components/context';
import IM from "../assets/MailingAddress.png";






function LoginPage() {
  const authContext = React.useContext(AuthContext)
      return (
          <Formik
              initialValues={{
                  email: '',
                  password: '',
              }}
              validationSchema={Yup.object().shape({

                  email: Yup.string()
                      .email('Email is invalid')
                      .required('Email is required'),
                  password: Yup.string()
                      .min(6, 'Password must be at least 6 characters')
                      .required('Password is required'),

              })}
              onSubmit={fields => {
                 
                  Login(fields);
              }}
              render={({ errors, status, touched }) => (
                <div className="container">
                  
                  
                  
                  <img className="IHQ" src={IM} alt =""/>
                
                  <Form className="LoginUI">
                  <div>
                  <h1 style={{color: "tomato" , textAlign:"center" , fontWeight:"bold"}}>FoodBeast Admin Login</h1>
                  </div>
                
                      
                      <div className="form-group">
   
                      <label htmlFor="email">Email</label>
                          <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </div>
                      <div className="ForgotP">
                      <label htmlFor="Fpassword"> Forgot Password?</label>
                      
                  </div>
                      <div className="form-group">
                          <button type="submit" className= "button1">Login</button>
                          <button type="reset" className="button2">Reset</button>
                      </div>
                      </Form>
                      </div>
                  
              )}
          />
      )
  
  
      async function Login(value){
        const email =value.email;
        const password=value.password;
        const user = await firebase.firestore().collection('admins').where('email','==',email).get();
        user.forEach(doc => {
          if (doc.data().password == password) {
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(doc.data(), null, 4))
            authContext.setUser(true)
          }
          else {
            alert ('Failure!')
          }
        });
      }

    }


export default LoginPage;