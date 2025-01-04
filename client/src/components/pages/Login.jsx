import React from 'react'
import { Link } from 'react-router-dom'
import { EmailSvg, GoogleSvg, PasswordSvg } from '../utils/Svg'
import { useInputValidation } from '6pp'
import { useDispatch } from 'react-redux'
import {
  loginFailed,
  loginRequest,
  loginSuccess
} from '../../redux/reducers/userSlice'
import { signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { auth, googleAuthProvider } from '../../firebase'
import Header from '../layout/Header'

export default function Login () {
  const email = useInputValidation('')
  const password = useInputValidation('')
  const dispatch = useDispatch()
  const handelGoogleLogin = async e => {
    e.preventDefault()
    try {
      const user = await signInWithPopup(auth, googleAuthProvider)
      dispatch(loginRequest())
      const token = await user.user.getIdToken()
      const response = axios.post(
        `${BASE_URL}/api/v1/auth/google-login`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      dispatch(loginSuccess((await response).data))
    } catch (err) {
      console.log(err)
      dispatch(loginFailed())
    }
  }

  const handelLogin = async e => {
    e.preventDefault()
    try {
      dispatch(loginRequest())
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/signin`,
        { email: email.value, password: password.value },
        { withCredentials: true }
      )
      dispatch(loginSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(loginFailed())
    }
  }
  return (
    <>
      {/* <Header/> */}
      <header className='flex bg-white z-40 items-center top-0 h-[70px] relative  w-full justify-between shadow-lg'>
        <nav className='flex bg-white z-40 items-center px-6 fixed  h-[70px] w-full justify-between shadow-lg'>
          <video
            src='/assets/techease.mp4'
            autoPlay
            loop
            muted
            playsInline
            className='h-[70px]'
          ></video>
          <Link
            to={'/'}
            class='flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='button'
          >
            Homepage
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              class='w-4 h-4 ml-1.5'
            >
              <path
                fill-rule='evenodd'
                d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                clip-rule='evenodd'
              />
            </svg>
          </Link>
        </nav>
      </header>
      <section className='flex bg-gray-50 shadow-lg py-10 justify-center'>
        <form onSubmit={handelLogin} className='form'>
          <div className='flex items-center justify-between'>
            {/* <img className='h-12 rounded-md' src='/assets/logo.jpg' alt='' /> */}

            <h2 className='text-2xl my-4 font-bold text-gray-800 text-center font-[Lato]'>
              Login to your
              <span className='ml-2 text-sky-500'>Account</span>
            </h2>
          </div>

          <div className='flex-column'>
            <label>Email </label>
          </div>
          <div className='inputForm'>
            <EmailSvg />
            <input
              required
              value={email.value}
              onChange={email.changeHandler}
              placeholder='Enter your Email'
              className='input'
              type='text'
            />
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
          <button type='submit' className='button-submit'>
            Sign In
          </button>
          <p className='p'>
            Don't have an account?{' '}
            <Link to='/signup' className='span'>
              Sign Up
            </Link>
          </p>
          <hr />

          <div className='flex-row'>
            <button
              type='button'
              onClick={handelGoogleLogin}
              className='btn google'
            >
              <GoogleSvg />
              Google
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
