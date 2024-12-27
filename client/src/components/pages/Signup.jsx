import {
  useInputValidation,
  useStrongPassword
} from '6pp'
import React, { useEffect } from 'react'
import { EmailSvg, GoogleSvg, NameSvg, PasswordSvg } from '../utils/Svg'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, setLoading } from '../../redux/reducers/userSlice'
import { Link } from 'react-router-dom'

export default function Signup () {
  const email = useInputValidation('')
  const name = useInputValidation('')
  const { loading } = useSelector(S => S.auth)
  const password = useStrongPassword('')
  const dispacth = useDispatch()
  const signUp = async ({ email, password, uid = null, name, image = '' }) => {
    try {
      dispacth(setLoading(true))
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/signup`,
        {
          email,
          password,
          name,
          uid,
          image
        },
        {
          withCredentials: true
        }
      )
      dispacth(loginSuccess(res.data));
    } catch (error) {
      console.log(error.message)
    } finally {
      dispacth(setLoading(false))
    }
  }
  const handleSignUp = async e => {
    e.preventDefault()
    signUp({ email: email.value, password: password.value, name: name.value })
  }

  const GoogleSignUp = async () => {
    try {
      const res = await signInWithPopup(auth, googleAuthProvider)
      signUp({
        email: res.user.email,
        password: '',
        uid: res.user.uid,
        name: res.user.displayName,
        image: res.user.photoURL
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    // Your effect logic here
    console.log(loading)
  }, [loading])

  return (
    <>
      <main className='font-[Lato] justify-center items-center flex lg:py-0 py-10'>
        {/* <section className='flex flex-col shadow-xl p-10 items-center gap-5'>
          <div>
            <img src='/assets/image.png' className='h-20 rounded-lg' alt='' />
          </div>
          <div className='mt-4'>
            <h1 className='text-xl font-semibold'>
              Techease - One Solution Platform
            </h1>
            <p className='text-gray-500'>
              Welcome to Techease, a one-stop solution
            </p>
          </div>

          <form onSubmit={handleSignUp} className='flex flex-col gap-2 w-96'>
            <div className='w-full max-w-sm min-w-[200px]'>
              <div className='relative'>
                <input
                  autoFocus
                  value={name.value}
                  onChange={name.changeHandler}
                  name='name'
                  type='text'
                  className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                  placeholder='Enter your name'
                />
                <NameSvg />
              </div>
            </div>
            <div className='w-full max-w-sm min-w-[200px]'>
              <div className='relative'>
                <input
                  value={email.value}
                  onChange={email.changeHandler}
                  name='email'
                  type='text'
                  className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                  placeholder='Enter your email'
                />
                <EmailSvg />
              </div>
            </div>
            <div className='w-full max-w-sm min-w-[200px]'>
              <div className='relative'>
                <input
                  type='password'
                  name='password'
                  value={password.value}
                  onChange={password.changeHandler}
                  className='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                  placeholder='Set up a Password'
                />
                <PasswordSvg />
                <p className='flex items-start mt-2 text-xs text-slate-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-5 h-5 mr-1.5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
                      clipRule='evenodd'
                    />
                  </svg>
                 {
                    password.error ? <>{password.error}</>:<>Use at least 8 characters, one uppercase, one lowercase and
                    one number.</>
                 }
                </p>
              </div>
            </div>
            <Button type='submit' onClick={handleSignUp} variant='contained'>
              Signup
            </Button>
          </form>
          <div className='flex items-center gap-2 w-full'>
            <hr className='w-full' />
            Or
            <hr className='w-full' />
          </div>
          <Button
            variant='contained'
            onClick={GoogleSignUp}
            sx={{
              backgroundColor: '#000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              gap: 2,
              color: '#fff'
            }}
          >
            <img src='/assets/googlelogo.png' className='h-4 w-4' /> Continue
            with Google
          </Button>
        </section> */}

        <form  onSubmit={handleSignUp} className='form md:shadow-lg'>
          <div className='flex justify-center'>
            {/* <img className='w-24 rounded-xl' src='/assets/image.png' alt='' /> */}
          </div>
          <h2 className='text-xl font-bold text-gray-800  font-sans'>
            Hello User 👋 ! Tell us about yourself
          </h2>

          <div className='flex flex-col'>
            <button type='button' onClick={GoogleSignUp} className='btn google'>
              <GoogleSvg />
              Continue with Google
            </button>
            <div className='flex gap-2 mt-2 items-center'>
              <hr className='w-full' />
              Or
              <hr className='w-full' />
            </div>
          </div>
          <div className='flex-column'>
            <label>Name </label>
          </div>
          <div className='inputForm'>
            <NameSvg />
            <input
              required
              value={name.value}
              onChange={name.changeHandler}
              placeholder='Enter your Name'
              className='input'
              type='text'
            />
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
              required
              value={password.value}
              onChange={password.changeHandler}
              placeholder='Set up your Password'
              className='input'
              type='password'
            />
          </div>

          <div className='flex-row'>
            <span className='span'>Forgot password?</span>
          </div>
          <button
          type='submit'
           
            className='button-submit'
          >
            Sign Up
          </button>
          <p className='p'>
            Already a user ?{' '}
            <Link to='/' className='span'>
              Sign In
            </Link>
          </p>
        </form>
      </main>
    </>
  )
}
