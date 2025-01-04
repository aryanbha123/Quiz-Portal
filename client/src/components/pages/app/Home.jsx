import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Contact from './Contact'

export default function Home () {
  const settings = {
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <>
      <section className='max-w-[100vw]'>
        <Slider className='max-w-[100vw] overflow-hidden' {...settings}>
          <div className='w-full'>
            <img
              className='min-h-[400px] object-cover object-center w-full'
              src='/assets/bg-1.jpg'
              alt=''
            />
          </div>
          <div className='w-full'>
            <img
              className='min-h-[400px] object-cover object-center w-full'
              src='/assets/bg-1.jpg'
              alt=''
            />
          </div>
          <div className='w-full'>
            <img
              className='min-h-[400px] object-cover object-center w-full'
              src='/assets/bg-1.jpg'
              alt=''
            />
          </div>
        </Slider>
      </section>
      <section className='md:px-5 mt-10 py-3 px-3'>
        <h1 className='mb-4 text-[28px] font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl'>
          One Platform with all Solution
        </h1>
        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  text-start'>
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
        <div>
          <Slider
            className='max-w-[100vw] md:flex justify-center gap-1 overflow-hidden'
            arrows={false}
            dots
            autoplaySpeed={3000}
            slidesToShow={4}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  dots: true,
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}
          >
            <Card
              title={'Apitute Training'}
              link='/'
              desciprion={'lorem ipsum dipsum lorem kisnn'}
            ></Card>
            <Card
              title={'Apitute Training'}
              link='/'
              desciprion={'lorem ipsum dipsum lorem kisnn'}
            ></Card>
            <Card
              title={'Apitute Training'}
              link='/'
              desciprion={'lorem ipsum dipsum lorem kisnn'}
            ></Card>
            <Card
              title={'Apitute Training'}
              link='/'
              desciprion={'lorem ipsum dipsum lorem kisnn'}
            ></Card>
          </Slider>
        </div>
      </section>
      <section className='md:py-16 py-5 '>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto'>
            <div className='relative w-full text-center lg:text-left lg:w-2/4'>
              <h2 className='text-2xl text-start font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0'>
                Enjoy the finest features with our products
              </h2>
            </div>
            <div className='relative w-full text-center  lg:text-left lg:w-2/4'>
              <p className='text-lg text-start font-normal text-gray-500 mb-5'>
                We provide all the advantages that can simplify all your
                financial transactions without any further requirements
              </p>
              <a
                href='#'
                className='flex flex-row items-center justify-center gap-2 text-base font-semibold text-[#0149ad] lg:justify-start hover:text-[#0149ad] '
              >
                Button CTA{' '}
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5'
                    stroke='#4F46E5'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className='flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8'>
            <div className='group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0149ad]'>
              <div className='bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 '>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z'
                    stroke='#4F46E5'
                    stroke-width='2'
                  ></path>
                </svg>
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white'>
                Easy Payment
              </h4>
              <p className='text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white'>
                We Provide Various Methods For You To Carry Out All Transactions
                Related To Your Finances
              </p>
            </div>
            <div className='group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0149ad]'>
              <div className='bg-white text-[#0149ad] rounded-full flex justify-center items-center mb-5 w-14 h-14 '>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.6071 14.375 9.6071C12.6491 9.6071 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571V20.8571M3.75 13.2264V15.2343C3.75 17.6868 3.75 18.9131 4.27747 19.9685C4.80493 21.0239 5.78567 21.76 7.74715 23.2322L8.57248 23.8516C11.4626 26.0208 12.9077 27.1054 14.5753 27.1054C16.243 27.1054 17.688 26.0208 20.5782 23.8516L21.4035 23.2322C23.365 21.76 24.3457 21.0239 24.8732 19.9685C25.4006 18.9131 25.4006 17.6868 25.4006 15.2343V13.2264C25.4006 9.95932 25.4006 8.32576 24.546 7.05852C23.6913 5.79128 22.1768 5.17918 19.1477 3.95499L18.3223 3.62144C16.4724 2.87381 15.5475 2.5 14.5753 2.5C13.6032 2.5 12.6782 2.87381 10.8283 3.62144L10.003 3.95499C6.97389 5.17919 5.45934 5.79128 4.60467 7.05852C3.75 8.32576 3.75 9.95932 3.75 13.2264Z'
                    stroke='#4F46E5'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  ></path>
                </svg>
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white'>
                Safe Transaction
              </h4>
              <p className='text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white'>
                We have the most up-to-date security to support the security of
                all our customers in carrying out all transactions.
              </p>
            </div>
            <div className='group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0149ad]'>
              <div className='bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 '>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z'
                    stroke='#4F46E5'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  ></path>
                </svg>
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white'>
                Fast Customer Service{' '}
              </h4>
              <p className='text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white'>
                Provide Customer Service For Those Of You Who Have Problems 24
                Hours A Week
              </p>
            </div>
            <div className='group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0149ad]'>
              <div className='bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 '>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z'
                    stroke='#4F46E5'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  ></path>
                </svg>
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white'>
                Quick Transaction
              </h4>
              <p className='text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white'>
                We provide faster transaction speeds than competitors, so money
                arrives and is received faster.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Team />
      <PareekshaPortalSection />
      <Contact/>
    </>
  )
}

const Card = ({ title, desciprion, link }) => (
  <div className='relative md:mr-2 flex flex-col items-center md:w-72 w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg'>
    <div className='relative h-40 m-2.5 overflow-hidden text-white rounded-md'>
      <img
        src='https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80'
        alt='card-image'
      />
    </div>
    <div className='px-4'>
      <h6 className='mb-2 text-gray-900 text-xl font-semibold'>{title}</h6>
      <p className='text-slate-600 leading-normal font-light'>
        The place is close to Barceloneta Beach and bus stop just 2 min by walk
      </p>
    </div>
    <div className='px-4 pb-4 pt-0 mt-2'>
      <Link
        to={link}
        className='rounded-md border border-transparent py-2 px-4 flex items-center text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        type='button'
      >
        Read More
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-4 h-4 ml-1.5'
        >
          <path
            fill-rule='evenodd'
            d='M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z'
            clip-rule='evenodd'
          />
        </svg>
      </Link>
    </div>
  </div>
)

const Team = () => {
  return (
    <section class='pb-10 pt-2 bg-gray-50'>
      <div class='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div class='flex justify-between items-center flex-col lg:flex-row md:mt-20'>
          <div class='w-full lg:w-1/2'>
            <h2 class='font-manrope text-5xl text-gray-900 font-bold leading-[4rem] mb-7 text-center lg:text-left'>
              Our leading, strong & creative team
            </h2>
            <p class='text-lg text-gray-500 mb-16 text-center lg:text-left'>
              These people work on making our product best.
            </p>
            <button class='cursor-pointer py-3 px-8 w-60 bg-[#0149ad] text-white text-base font-semibold transition-all duration-500 block text-center rounded-full hover:bg-[#0149ad] mx-auto lg:mx-0'>
              Apply{' '}
            </button>
          </div>
          <div class='w-full lg:w-1/2 lg:mt-0 md:mt-40 mt-16 max-lg:max-w-2xl'>
            <div class='grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 gap-8'>
              <img
                src='https://pagedone.io/asset/uploads/1696238644.png'
                alt='Team tailwind section'
                class='w-44 h-56 rounded-2xl object-cover md:mt-20 mx-auto min-[450px]:mr-0'
              />
              <img
                src='https://pagedone.io/asset/uploads/1696238665.png'
                alt='Team tailwind section'
                class='w-44 h-56 rounded-2xl object-cover mx-auto min-[450px]:ml-0 md:mx-auto'
              />
              <img
                src='https://pagedone.io/asset/uploads/1696238684.png'
                alt='Team tailwind section'
                class='w-44 h-56 rounded-2xl object-cover md:mt-20 mx-auto min-[450px]:mr-0 md:ml-0'
              />
              <img
                src='https://pagedone.io/asset/uploads/1696238702.png'
                alt='Team tailwind section'
                class='w-44 h-56 rounded-2xl object-cover mx-auto min-[450px]:ml-0 md:mr-0 md:ml-auto'
              />
              <img
                src='https://pagedone.io/asset/uploads/1696238720.png'
                alt='Team tailwind section'
                class='w-44 h-56 rounded-2xl object-cover md:-mt-20 mx-auto min-[450px]:mr-0 md:mx-auto'
              />
              <img
                src='https://pagedone.io/asset/uploads/1696238737.png'
                alt='Team tailwind section'
                class='w-44 h-56 rounded-2xl object-cover mx-auto min-[450px]:ml-0 md:mr-0'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PareekshaPortalSection = () => {
  return (
    <section className='overflow-hidden bg-white py-8 sm:py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          <div className='lg:pr-8 lg:pt-4'>
            <div className='lg:max-w-lg'>
              <h2 className='text-base font-semibold leading-7 text-[#0149ad]'>
                Streamline Exams
              </h2>
              <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Pareeksha Portal API
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                The API built to simplify and scale online exam management
                workflows for institutions.
              </p>
              <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                <div className='relative pl-9'>
                  <dt className='inline font-semibold text-gray-900'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='absolute left-1 top-1 h-5 w-5 text-[#0149ad] '
                    >
                      <path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z' />
                      <path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z' />
                      <path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z' />
                    </svg>
                    Template driven
                  </dt>
                  <dd className='inline'>
                    Create and manage templated exam schedules, notifications,
                    and result generation with ease.
                  </dd>
                </div>
                <div className='relative pl-9'>
                  <dt className='inline font-semibold text-gray-900'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='absolute left-1 top-1 h-5 w-5 text-[#0149ad]'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Simple, REST
                  </dt>
                  <dd className='inline'>
                    RESTful APIs to streamline integration for exam setup,
                    progress tracking, and results.
                  </dd>
                </div>
                <div className='relative pl-9'>
                  <dt className='inline font-semibold text-gray-900'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='absolute left-1 top-1 h-5 w-5 text-[#0149ad]'
                    >
                      <path
                        fillRule='evenodd'
                        d='M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z'
                        clipRule='evenodd'
                      />
                      <path d='M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z' />
                    </svg>
                    Developer friendly
                  </dt>
                  <dd className='inline'>
                    Comprehensive documentation and examples for seamless
                    integration into your system.
                  </dd>
                </div>
              </dl>
              <div className='mt-10 flex items-center gap-x-6'>
                <a
                  href='#'
                  className='rounded-md bg-[#0149ad] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0149ad] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0149ad]'
                >
                  Start for free
                </a>
                <a
                  href='#'
                  className='text-sm font-semibold leading-6 text-gray-700'
                >
                  Schedule a demo <span aria-hidden='true'>→</span>
                </a>
              </div>
            </div>
          </div>
          <img
            src='/assets/portal.jpg'
            alt='Pareeksha Portal screenshot'
            className='w-[48rem]  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
            width='2432'
            height='1442'
          />
        </div>
      </div>
    </section>
  )
}
