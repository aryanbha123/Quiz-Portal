import React from 'react'
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
import { Link } from 'react-router-dom'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Profile = () => {
  const user = useSelector(state => state.auth.user)

  // Sample chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Learning Progress',
        data: [30, 45, 60, 80, 90, 100], // Example data, replace with actual
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className='min-h-screen  bg-gray-100 dark:bg-gray-800 flex justify-between gap-10  p-6'>
      <div className='w-full md:w-11/12 lg:w-3/4 xl:w-1/2 2xl:w-1/3 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8'>
        {/* Profile Header */}
        <div className='flex items-center justify-center mb-8 flex-col'>
          <img
            src={user.avatar || 'https://via.placeholder.com/150'}
            alt='User Avatar'
            className='rounded-full w-32 h-32 border-4 border-gray-300 dark:border-gray-700 mb-4'
          />
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-white'>
            {user.name}
          </h2>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            {user.email}
          </p>
        </div>

        {/* Bio Section */}
        <div className='mb-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            Bio
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-300 mt-2'>
            {user.bio || 'No bio available'}
          </p>
        </div>

        {/* Additional Information */}
        <div className='mb-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            Additional Information
          </h3>
          <ul className='list-none mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300'>
            <li>
              <strong>Location:</strong> {user.location || 'Not provided'}
            </li>
            <li>
              <strong>Joined:</strong>{' '}
              {new Date(user.joinedAt).toLocaleDateString()}
            </li>
            <li>
              <strong>Followers:</strong> {user.followers || 0}
            </li>
            <li>
              <strong>Following:</strong> {user.following || 0}
            </li>
            <li>
              <strong>Phone:</strong> {user.phone || 'Not provided'}
            </li>
          </ul>
        </div>

        {/* Learning Stats */}
        <div className='mb-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            Learning Stats
          </h3>
          <ul className='list-none mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300'>
            <li>
              <strong>Total Quizzes Solved:</strong>{' '}
              {user.quizzesSolved ? user.quizzesSolved.length : 0}
            </li>
            <li>
              <strong>Badges Earned:</strong>{' '}
              {user.badges ? user.badges.length : 0}
            </li>
            <li>
              <strong>Current Level:</strong> {user.level || 'Beginner'}
            </li>
          </ul>
        </div>

        {/* Learning Journey Timeline */}
        <div className='mb-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            Learning Journey
          </h3>
          <div className='space-y-4'>
            {user.learningJourney && user.learningJourney.length > 0 ? (
              user.learningJourney.map((event, index) => (
                <div
                  key={index}
                  className='text-sm text-gray-600 dark:text-gray-300'
                >
                  <strong>{event.date}</strong>: {event.activity}
                </div>
              ))
            ) : (
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                No journey updates yet.
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className='mt-6 text-center'>
          <button className='px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600'>
            Edit Profile
          </button>
        </div>
      </div>

      {/* New Section: Chart & Go to Code */}
      <div className='w-full md:w-11/12 lg:w-3/4 xl:w-1/2 2xl:w-1/3 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 '>
        {/* Chart Section */}
        <div className='mb-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            Learning Progress Chart
          </h3>
          <div className='mt-4'>
            <Line data={chartData} />
          </div>
        </div>

        {/* Go to Code Section */}
        <div className='mt-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            Go to Code
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-300 mt-4'>
            Coming Soon: Stay tuned for upcoming coding challenges and tutorials
            on our portal.
          </p>
        </div>
        {/* About the Portal Section */}
        <div className='my-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            About the Portal
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-300 mt-4'>
            Welcome to the Learning Portal! This platform offers a dynamic
            learning experience with quizzes, challenges, and a community of
            learners. Track your progress, earn badges, and level up as you
            continue your learning journey.
          </p>
        </div>
        <div className='my-6'>
          <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
            Useful Links
          </h3>
          <ul className='p-1' >
            <li>
              <Link className='text-sky-700 text-sm'>Unsuna Bharat</Link>
            </li>
         
            <li>
              <Link className='text-sky-700 text-sm'>Terms & Policies</Link>
            </li>
            <li>
              <Link className='text-sky-700 text-sm'>Usage Guide</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
