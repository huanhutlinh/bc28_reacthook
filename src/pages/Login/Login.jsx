import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Login(props) {

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:Yup.object().shape({
            email: Yup.string().required('Email không được bỏ trống !'),
            password: Yup.string().required('Email không được bỏ trống !')
        })
        ,
        onSubmit: (values)=>{
            console.log(values)
        }
    });
  return (
    <form className='container' onSubmit={formik.handleSubmit}>
        <h3>Login</h3>
        <div className='form-group'>
            <p>Email</p>
            <input className='form-control' id="email" name='email' onChange={formik.handleChange} />
        </div>
        <div className='form-group'>
            <p>password</p>
            <input className='form-control' id="password" name='password' onChange={formik.handleChange} />
        </div>
        <div className='form-group'>
           <button type='submit' className='btn btn-success mt-2'>Login</button>
        </div>
    </form>
  )
}
