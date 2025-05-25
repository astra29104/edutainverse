import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useCourses } from '../../context/CourseContext';
import { Course } from '../../types';
import { Search, Filter, BookOpen } from 'lucide-react';

const MyLearningPage: React.FC = () => {
  const { courses, getEnrolledCourses } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const enrolledCourses = getEnrolledCourses();
  const enrolledCourseObjects = courses.filter(course =>
    enrolledCourses.some(ec => ec.courseId === course.id)
  );

  const filteredCourses = enrolledCourseObjects.filter(course => {
    const enrollment = enrolledCourses.find(ec => ec.courseId === course.id);
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'completed' && enrollment?.progress.percentage === 100) ||
      (filter === 'in-progress' && enrollment?.progress.percentage! < 100);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Learning</h1>
            <p className="text-gray-600">Track your progress and continue learning</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search your courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'in-progress' | 'completed')}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <CourseList
              courses={filteredCourses}
              showWishlist={false}
              showEnrollButton={false}
              showProgress={true}
            />
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-2 text-gray-500">
                {enrolledCourseObjects.length === 0
                  ? "You haven't enrolled in any courses yet."
                  : "No courses match your search criteria."}
              </p>
              {enrolledCourseObjects.length === 0 && (
                <Link
                  to="/courses"
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Courses
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyLearningPage;