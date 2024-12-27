import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/thunks/userThunks'
import Toast from './components/utils/Toast'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import ProtectedRoute, { UserRoute } from './components/auth/Protectedoutes'
import Loader from './components/utils/Loader'

export default function App () {
  const { user, loading, error } = useSelector(s => s.auth)

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) dispatch(getUser(await user.getIdToken()));
      else dispatch(getUser());
    })
    return () => unsubscribe()
  }, [dispatch]);



  // User Routes
  const UserDashboard = lazy(() => import('./components/pages/user/Userdashboard'));
  const Home = lazy(() => import('./components/pages/user/Home'));
  // Shared Routes
  const Login = lazy(() => import('./components/pages/Login'))
  const Signup = lazy(() => import('./components/pages/Signup'))
  return (
    <>
      {loading ? (
        <><Loader/></>
      ) : (
        <Suspense fallback={  <><Loader/></>} >
          <BrowserRouter>
            <Routes>
              <Route element={<UserRoute />}>
                <Route path='/' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
              </Route>

              <Route element={<ProtectedRoute requiredRole={'user'} />}>
              <Route path='/user' element={<UserDashboard />}>
                  <Route index element={<Home/>} />
                  <Route path='profile' element={<>User Profile</>} />
                  <Route path='settings' element={<>User Settings</>} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute requiredRole={"admin"} />}>
                <Route path='/admin' element={<>Admin</>} />
                <Route path='/admin/profile' element={<>Admin Profie</>} />
                <Route path='/admin/settings' element={<>Admin Settings</>} />
              </Route>
              <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>

            <Toast
              isOpen={true}
              message='Please Login to your account'
              type='warning'
            />
          </BrowserRouter>
        </Suspense>
      )}
    </>
  )
}
