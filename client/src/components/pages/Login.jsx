import React from 'react'
import { Link } from 'react-router-dom'
import { EmailSvg, GoogleSvg, PasswordSvg } from '../utils/Svg'
import { useInputValidation } from '6pp'
import { useDispatch } from 'react-redux'
import { loginFailed, loginRequest, loginSuccess } from '../../redux/reducers/userSlice'
import { signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { auth, googleAuthProvider } from '../../firebase'

export default function Login () {
  const email = useInputValidation('');
  const password = useInputValidation('');
  const dispatch = useDispatch();
  const handelGoogleLogin = async (e) => {
    e.preventDefault();
    try{
        const user = await signInWithPopup(auth,googleAuthProvider);
        dispatch(loginRequest());
        const token = await user.user.getIdToken();
        const response = axios.post(`${BASE_URL}/api/v1/auth/google-login` , {} , {withCredentials:true
            ,
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(loginSuccess((await response).data));
    }catch(err){
        console.log(err);
        dispatch(loginFailed());
    }
  }

  const handelLogin = async (e) => {

    e.preventDefault()
    try{
        dispatch(loginRequest());
        const response = await axios.post(`${BASE_URL}/api/v1/auth/signin` , {email:email.value,password:password.value} , {withCredentials:true});
        dispatch(loginSuccess(response.data));
    }catch(error){
        console.log(error);
        dispatch(loginFailed());
    }
  }
  return (
    <section className='flex justify-center'>
      <form onSubmit={handelLogin} className='form md:shadow-sm'>
        <div className='flex justify-center'>
          <img className='w-24 rounded-md' src='/assets/image.png' alt='' />
        </div>
        <h2 className='text-xl my-4 font-bold text-gray-800 text-center font-[Lato]'>
          Login to your account
        </h2>
        <div className='flex-column'>
          <label>Email </label>
        </div>
        <div className='inputForm'>
          <EmailSvg />
          <input required value={email.value} onChange={email.changeHandler} placeholder='Enter your Email' className='input' type='text' />
        </div>

        <div className='flex-column'>
          <label>Password </label>
        </div>
        <div className='inputForm'>
          <PasswordSvg />
          <input
          value={password.value}
          onChange={password.changeHandler}
          required
            placeholder='Enter your Password'
            className='input'
            type='password'
          />
        </div>

        <div className='flex-row'>
          <span className='span'>Forgot password?</span>
        </div>
        <button type='submit' className='button-submit'>Sign In</button>
        <p className='p'>
          Don't have an account?{' '}
          <Link to='/signup'className='span'>
            Sign Up
          </Link>
        </p>
        <hr />

        <div className='flex-row'>
          <button type='button' onClick={handelGoogleLogin} className='btn google'>
            <GoogleSvg />
            Google
          </button>
        </div>
      </form>
    </section>
  )
}
