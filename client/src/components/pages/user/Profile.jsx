import React from 'react';
import Slider from 'react-slick';
import { Pie } from 'react-chartjs-2'; // For the pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfilePage = () => {
  // Sample user data
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    quizSolved: 12,
    phoneNo: '123-456-7890',
    university: 'ABC University',
    program: 'Computer Science',
    dob: '01/01/2000',
  };

  // Sample data for pie chart
  const data = {
    labels: ['Math', 'Science', 'History', 'Arts'], // Example categories
    datasets: [
      {
        data: [30, 20, 25, 25], // Random values for categories
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  // Slick Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-8">
      {/* User Info Section */}
      <div className="flex flex-col mb-8 space-y-4">
        <h2 className="text-3xl font-semibold">{userInfo.name}</h2>
        <p className="text-lg">Email: {userInfo.email}</p>
        <p className="text-lg">Quizzes Solved: {userInfo.quizSolved}</p>
        <p className="text-lg">Phone: {userInfo.phoneNo}</p>
        <p className="text-lg">University: {userInfo.university}</p>
        <p className="text-lg">Program: {userInfo.program}</p>
        <p className="text-lg">Date of Birth: {userInfo.dob}</p>
      </div>

      {/* Pie Chart Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Subject Performance</h3>
        <Pie data={data} />
      </div>

      {/* Slider Section for Roadmap Images */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Roadmap</h3>
        <Slider {...sliderSettings}>
          <div>
            <img src="https://via.placeholder.com/500x300" alt="Roadmap 1" className="w-full rounded-lg" />
          </div>
          <div>
            <img src="https://via.placeholder.com/500x300" alt="Roadmap 2" className="w-full rounded-lg" />
          </div>
          <div>
            <img src="https://via.placeholder.com/500x300" alt="Roadmap 3" className="w-full rounded-lg" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ProfilePage;
