import React, { lazy, Suspense, useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Add, Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { getQuiz } from '../../../redux/api/getQuiz'
import axios from 'axios'
import { BASE_URL } from '../../../config'

export default function Home () {
  const AddQuizModal = lazy(() => import('../../modals/Addquiz'))
  const [AddQuiz, setAddQuiz] = useState(false)
  const { hasMore, loading, data } = useSelector(s => s.quiz)
  const fetchMore = async () => {
    getQuiz()
  }

  return (
    <>
      <section>
        {/* Create & Search Quiz Menu */}
        <div className='flex justify-between items-center'>
          <div className='w-full max-w-sm  min-w-[200px] '>
            <div className='inputForm relative bg-white'>
              <svg
                className='absolute w-5 h-5 top-[] cursor-pointer right-2.5 text-slate-600 -ml-0.5 sm:-ml-1 mr-2  sm:h-5 sm:w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
              <input
                required
                value={''}
                onChange={() => {}}
                placeholder='Search Here ...'
                className='input'
                type='text'
              />
            </div>
          </div>
          <div className='flex gap-3'>
            <Button
              variant='contained'
              onClick={() => {
                setAddQuiz(true)
              }}
            >
              Manage Users
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                setAddQuiz(true)
              }}
            >
              Add Quiz <Add sx={{ marginLeft: '10px' }} />
            </Button>
          </div>
        </div>
      </section>
      <section className='flex  gap-5 mt-3'>
        {/* All Quizes */}
        <div className='flex-1'>
          <h1 className='text-lg bg-gray-100 font-[Lato] pl-4 py-2 font-semibold'>
            All Quiz
          </h1>
          <Table
            fetchMore={fetchMore}
            loading={loading}
            hasMore={hasMore}
            data={data}
          />
        </div>
      </section>
      {AddQuiz && (
        <Suspense
          fallback={
            <div className='fixed flex h-screen w-screen left-0 top-0 z-50 justify-center items-center bg-black bg-opacity-45 '>
              <CircularProgress />
            </div>
          }
        >
          <AddQuizModal setModalClose={setAddQuiz} />
        </Suspense>
      )}
    </>
  )
}

function Table ({ data = [], hasMore, loading, fetchMore }) {
  
  const dispatch = useDispatch();
  const deleteQuiz = async id => {
    axios
      .get(`${BASE_URL}/api/v1/quiz/del/${id}`)
      .then(res => {
        console.log(res.data);
        dispatch(getQuiz());
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className='relative overflow-x-auto max-h-[700px] overflow-y-auto'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Title
            </th>
            <th scope='col' className='px-6 py-3'>
              Category
            </th>
            <th scope='col' className='px-6 py-3'>
              Is Available
            </th>
            <th scope='col' className='px-6 py-3'>
              Edit
            </th>
            <th scope='col' className='px-6 py-3'>
              Delete
            </th>
            <th scope='col' className='px-6 py-3'>
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, key) => (
            <tr
              key={key}
              className={`${
                key % 2 == 0 ? 'bg-gray-100' : 'bg-white'
              } border-b dark:bg-gray-800 dark:border-gray-700`}
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {i.title}
              </th>
              <td className='px-6 py-4'>
                {i.category ? i.category : 'Misclenous'}
              </td>
              <td className='px-6 py-4'>
                {i.isAvailable ? 'Available' : 'Not Available'}
              </td>
              <td className='px-6 py-4'>
                <Link to={'/admin/edit/' + i._id}>
                  <Edit />
                </Link>
              </td>
              <td className='px-6 py-4'>
                <Link onClick={() => {deleteQuiz(i._id)}} >
                  <Delete />
                </Link>
              </td>
              <td className='px-6 py-4'>
                <Link to={'/admin/view/' + i._id}>
                  <RemoveRedEye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        onClick={fetchMore}
        className='text-xs text-gray-700 uppercase py-2 px-1 cursor-pointer text-center dark:bg-gray-700'
      >
        {hasMore && !loading && <>View More</>}
      </p>
      {loading && (
        <p className='text-center'>
          <CircularProgress color='gray' size={'15px'} />
        </p>
      )}
    </div>
  )
}
