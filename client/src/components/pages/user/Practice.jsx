import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../config'
import { Link } from 'react-router-dom'
import { LockRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getQuiz } from '../../../redux/api/getQuiz'
import { setCurrentPage } from '../../../redux/reducers/quizReducer'

export default function PracticePage () {
  return (
    <>
      <Table />
    </>
  )
}

const Table = () => {
  const { hasMore, page, loading, data, currentPage, totalPages } = useSelector(
    s => s.quiz
  )
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(data)
  }, [data])

  const nextPage = () => {
    if (currentPage == page - 1 || currentPage == page) {
      getQuiz()
    } else {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }
  const prevPage = () => {
    if (currentPage == 1) {
      return;
    } else {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }
  return (
    <>
      <div className='w-full flex justify-between items-center mb-3 mt-1 pl-3'>
        <div>
          <h3 className='text-lg font-semibold text-slate-800'>
            Practice Area
          </h3>
          <p className='text-slate-500'>Get Hands on expirience </p>
        </div>
        <div className='ml-3'>
          <div className='w-full max-w-sm min-w-[200px] relative'>
            <div className='relative'>
              <input
                className='bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                placeholder='Search for Quiz'
              />
              <button
                className='absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded '
                type='button'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='3'
                  stroke='currentColor'
                  className='w-8 h-8 text-slate-600'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
        <table className='w-full text-left table-auto min-w-max'>
          <thead>
            <tr>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Title
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Difficulty
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Duration
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Category
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Attempt
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data[currentPage]?.map((i, key) => (
              <>
                <tr
                  key={key}
                  className='hover:bg-slate-50 border-b border-slate-200'
                >
                  <td className='p-4 py-5'>
                    <p className='block font-semibold text-sm text-slate-800'>
                      {i.title}
                    </p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='text-sm text-slate-500'>{i.difficulty}</p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='text-sm text-slate-500'>
                      {i.duration + ' ' + 'min.'}
                    </p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='text-sm text-slate-500'>{i.category}</p>
                  </td>
                  <td className='p-4 py-5'>
                    {i.isAvailable ? (
                      <Link
                        className='text-sm text-slate-500'
                        to={`/user/solution/${i._id}`}
                      >
                        Attempt
                      </Link>
                    ) : (
                      <>
                        <p className='text-sm text-slate-500'></p>
                        <LockRounded color='inherit' />
                      </>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <div className='flex justify-between items-center px-4 py-3'>
          <div className='text-sm text-slate-500'>
            Showing <b>1-{data[currentPage]?.length}</b> of {totalPages}
          </div>
          <div className='flex space-x-1'>
            <button
              onClick={prevPage}
              disabled={currentPage == 1}
              className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
            >
              Prev
            </button>
            {/* <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease'>
              1
            </button>
            <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'>
              2
            </button>
            <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'>
              3
            </button> */}
            <button
              disabled={!hasMore  && currentPage == page - 1}
              onClick={nextPage}
              className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
