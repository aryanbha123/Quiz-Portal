import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import Slider from 'react-slick'

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Home () {
  const { user } = useSelector(s => s.auth)
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite:true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  const svgIcons = [
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 18.364l2.122-2.121M2.808 13.636l2.121 2.121M21.192 13.636l-2.121 2.121M18.879 18.364l-2.122-2.121M5.636 8.464L7.758 6.343m4.95 0L12 3m4.242 4.95l-2.121-2.12M12 16.95v5.05m-7.07-2.929A9 9 0 1121 12v1m-9 5a9 9 0 000-10m0 0L7.757 6.344m4.95 0L16.243 6.34" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 14c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.072 13.636L12 16.95l-4.071-3.314m0-3.271l4.072-3.314 4.072 3.314m1.357 3.271v3.929a1.95 1.95 0 01-.622 1.414 1.951 1.951 0 01-1.735.478M7.05 19.792a1.951 1.951 0 01-1.734-.478A1.951 1.951 0 014.694 17.9v-3.929" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 14c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /></svg>`
  ]

  return (
    <>
      <section className='bg-gray-50 gap-6 dark:text-gray-50 text-gray-700 flex flex-col lg:flex-row dark:bg-gray-700 '>
        {/* Profile Section */}
        <div className='flex bg-white shadow-lg min-w-[330px] p-6 rounded-xl dark:bg-gray-800 flex-col items-center max-w-[600px]'>
          <Avatar className='mb-4' style={{ width: '80px', height: '80px' }} />
          <p className='text-xl font-bold mb-2'>{user.name}</p>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            {user.email}
          </p>
          <div className='mt-6 flex flex-col items-start w-full text-sm'>
            <small>
              <strong>University:</strong> {user.university || 'Not Provided'}
            </small>
            <small>
              <strong>Program:</strong> {user.program || 'Not Provided'}
            </small>
            <small>
              <strong>Phone:</strong> {user.phone || 'Not Provided'}
            </small>
            <small>
              <strong>Email Verified:</strong> {user.isVerified ? 'Yes' : 'No'}
            </small>
            <small>
              <strong>Solutions:</strong> {user.solutions || 0}
            </small>
            <small>
              <strong>Joined:</strong> {new Date(user.createdAt).toDateString()}
            </small>
          </div>
        </div>

        {/* Updates Section */}
        <div>
          <UserProgressChart />
        </div>

        {/* Actions Section */}
        <div className='flex-1 grid dark:bg-gray-800 grid-cols-1 lg:grid-cols-2 bg-white gap-6 rounded-lg shadow-lg p-6'>
          {[
            {
              href: '/profile',
              title: 'Complete Your Profile',
              description: 'Update your profile to access all features.',
              svg: svgIcons[0]
            },
            {
              href: '/practice',
              title: 'Practice Challenges',
              description: 'Enhance your skills with curated challenges.',
              svg: svgIcons[1]
            },
            {
              href: '/code',
              title: 'Start Coding',
              description: 'Begin coding projects and showcase your talent.',
              svg: svgIcons[2]
            },
            {
              href: '/roadmaps',
              title: 'Explore Roadmaps',
              description: 'Follow structured paths to achieve your goals.',
              svg: svgIcons[3]
            }
          ].map((action, idx) => (
            <div
              key={idx}
              className='w-full h-full bg-sky-700 text-white rounded-lg flex flex-col justify-center items-center p-3 hover:bg-sky-800 transition duration-300 cursor-pointer text-center'
            >
              <div
                dangerouslySetInnerHTML={{ __html: action.svg }}
                className='mb-4'
              ></div>
              <a href={action.href} className='text-md font-medium mb-2'>
                {action.title}
              </a>
              <p className='text-sm'>{action.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Slider autoplay autoplaySpeed={2000} {...sliderSettings} className='bg-white  gap-3 dark:bg-gray-900 mt-5 shadow-xl rounded-[20px] p-5'>
        <blockquote
        style={{
          width:"auto"
        }}
          className='instagram-media'
          data-instgrm-captioned
          data-instgrm-permalink='https://www.instagram.com/p/DD6ksVczelR/?utm_source=ig_embed&amp;utm_campaign=loading'
          data-instgrm-version='14'
        ></blockquote>
        <blockquote
          className='instagram-media '
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DD6k7eczXIf/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version='14'
        ></blockquote>
        <blockquote
          className='instagram-media '
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DD6k3B8z4O5/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version='14'
        ></blockquote>
        <blockquote
          className='instagram-media '
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DD6lHN_TJ-k/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version='14'
        ></blockquote>
        <blockquote
          className='instagram-media '
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DD6knrtzN3W/?utm_source=ig_embed&amp;utm_campaign=loading" 
          data-instgrm-version='14'
        ></blockquote>
        <blockquote
          className='instagram-media '
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DD6khWnT62G/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version='14'
        ></blockquote>
      </Slider>
    </>
  )
}

const UserProgressChart = ({ dataPoints, labels }) => {
  const data = {
    labels: labels || ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'User Progress',
        data: dataPoints || [10, 25, 40, 55],
        borderColor: 'rgba(29, 78, 216, 1)', // sky-700 color
        backgroundColor: 'rgba(29, 78, 216, 0.2)',
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(29, 78, 216, 1)'
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#374151' // Neutral Gray 700 for light/dark compatibility
        }
      },
      tooltip: {
        callbacks: {
          label: context => `${context.raw} Points`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#374151'
        }
      },
      y: {
        grid: {
          color: '#D1D5DB' // Neutral Gray 300
        },
        ticks: {
          color: '#374151'
        }
      }
    }
  }

  return (
    <div className='bg-white h-full dark:bg-gray-800 rounded-lg shadow-lg p-6'>
      <h2 className='text-lg font-bold mb-4 text-gray-800 dark:text-gray-50'>
        User Progress
      </h2>
      <Line data={data} options={options} />
    </div>
  )
}
