import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { Link } from 'react-router-dom';

export default function PracticePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    axios
      .get(`${BASE_URL}/api/v1/quiz/get`)
      .then((response) => {
        setQuizzes(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch quizzes:', err);
        setError('Failed to load quizzes. Please try again.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading quizzes...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Practice Quizzes</h1>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Duration</th>
              <th className="px-4 py-2 border border-gray-300">Marks</th>
              <th className="px-4 py-2 border border-gray-300">Questions</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr
                key={quiz._id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="px-4 py-2 border border-gray-300">{quiz.title}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {quiz.duration} mins
                </td>
                <td className="px-4 py-2 border border-gray-300">{quiz.marks}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {quiz.questions.length}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`font-semibold ${
                      quiz.isAvailable ? 'text-green-600' : 'text-gray-600'
                    }`}
                  >
                    {quiz.isAvailable ? 'Available' : 'Locked'}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {quiz.isAvailable ? (
                    <Link  to={`/user/solution/${quiz._id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      Attempt Quiz
                    </Link>
                  ) : (
                    <span className="text-gray-500">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
