import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FiSettings, FiBell } from 'react-icons/fi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const updates = [
    'Completed Module 1 of React Basics.',
    'Achieved 90% in JavaScript Assessment.',
    'Enrolled in Advanced Node.js Course.',
  ];

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Learning Progress (%)',
        data: [20, 40, 70, 90],
        fill: false,
        borderColor: '#3182CE',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Main Content */}
      <main className="flex-1 p-8 bg-white bg-opacity-90 dark:bg-gray-800 rounded-3xl shadow-xl">
        {/* Welcome Section */}
        <Paper className="p-6 mb-6 bg-blue-700 text-white rounded-2xl shadow-xl">
          <Typography variant="h5" className="font-semibold text-xl">
            Welcome, John Doe!
          </Typography>
          <Typography className="mt-2 text-lg">
            Welcome to your learning portal! Here you can track your progress, view updates, and explore additional resources to help you succeed in your learning journey.
          </Typography>
        </Paper>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Latest Updates Section */}
          <Paper className="p-5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <Typography
              variant="h6"
              className="mb-4 text-blue-600 font-semibold"
            >
              Latest Updates
            </Typography>
            <List>
              {updates.map((update, index) => (
                <React.Fragment key={index}>
                  <ListItem className="hover:bg-blue-50 dark:hover:bg-gray-600 rounded-md transition-all">
                    <ListItemText primary={update} />
                  </ListItem>
                  {index < updates.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* User Progress Section */}
          <Paper className="p-5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <Typography
              variant="h6"
              className="mb-4 text-sky-600 font-semibold"
            >
              Your Progress
            </Typography>
            <Line data={progressData} />
          </Paper>

          {/* Calendar Section */}
          <Paper className="p-5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <Typography variant="h6" className="mb-4 text-sky-600 font-semibold">
              Calendar
            </Typography>
            <Calendar className="rounded-lg shadow-md transition-all transform hover:scale-105" />
          </Paper>
        </div>

        {/* Motivational Quote Section */}
        <Paper className="p-5 bg-green-500 text-white rounded-2xl shadow-xl mt-6">
          <Typography variant="h6" className="mb-4 text-center font-bold">
            "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence."
          </Typography>
        </Paper>

        {/* Usage Information Section */}
        <Paper className="p-5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-lg hover:shadow-2xl transition-all mt-6">
          <Typography variant="h6" className="mb-4 text-blue-600 font-semibold">
            How to Use This Portal
          </Typography>
          <Typography className="text-lg">
            This portal is designed to help you track your learning progress, receive updates on your courses, and stay on top of upcoming assignments and deadlines.
            <br />
            <strong>Key Features:</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Track your learning progress with weekly milestones.</li>
              <li>View your latest updates and achievements.</li>
              <li>Stay organized with the integrated calendar for deadlines and important events.</li>
            </ul>
          </Typography>
        </Paper>
      </main>
    </div>
  );
}
