import { useEffect, useState } from 'react';
import { 
  User, BookOpen, Users, Video, FileText, MessageSquare, 
  Calendar, Clock, BarChart, Award, Upload, Edit, 
  Settings, Bell, LogOut, Plus, Eye, Download, Trash2,
  Star, DollarSign, TrendingUp, CheckCircle
} from 'lucide-react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Page } from '../types';

interface Props {
  onNavigate: (page: Page) => void;
}

interface Course {
  id: number;
  title: string;
  category: string;
  students: number;
  lectures: number;
  rating: number;
  revenue: number;
  status: 'published' | 'draft' | 'archived';
  lastUpdated: string;
}

interface Lecture {
  id: number;
  title: string;
  duration: string;
  uploadDate: string;
  views: number;
  studentsCompleted: number;
  type: 'video' | 'pdf' | 'quiz';
}

interface Student {
  id: number;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  grade?: string;
}

export default function InstructorDashboard({ onNavigate }: Props) {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Mock data
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: 'AI Powered Learning', category: 'Computer Science', students: 78, lectures: 12, rating: 4.8, revenue: 780, status: 'published', lastUpdated: '2024-02-10' },
    { id: 2, title: 'Data Science Fundamentals', category: 'Data Science', students: 45, lectures: 8, rating: 4.6, revenue: 450, status: 'published', lastUpdated: '2024-02-08' },
    { id: 3, title: 'Web Development Bootcamp', category: 'Web Dev', students: 33, lectures: 15, rating: 4.9, revenue: 330, status: 'published', lastUpdated: '2024-02-12' },
    { id: 4, title: 'Machine Learning Advanced', category: 'AI/ML', students: 0, lectures: 3, rating: 0, revenue: 0, status: 'draft', lastUpdated: '2024-02-11' },
  ]);

  const [lectures, setLectures] = useState<Lecture[]>([
    { id: 1, title: 'Introduction to AI', duration: '45:20', uploadDate: '2024-01-15', views: 89, studentsCompleted: 65, type: 'video' },
    { id: 2, title: 'ML Basics Lecture Notes', duration: 'PDF (12 pages)', uploadDate: '2024-01-16', views: 76, studentsCompleted: 58, type: 'pdf' },
    { id: 3, title: 'Neural Networks Explained', duration: '58:10', uploadDate: '2024-01-20', views: 72, studentsCompleted: 49, type: 'video' },
    { id: 4, title: 'Quiz 1: ML Fundamentals', duration: 'Quiz (20 questions)', uploadDate: '2024-01-22', views: 68, studentsCompleted: 42, type: 'quiz' },
    { id: 5, title: 'Deep Learning Concepts', duration: '1:05:30', uploadDate: '2024-01-25', views: 61, studentsCompleted: 38, type: 'video' },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Ali Ahmed', email: 'ali@example.com', progress: 85, lastActive: 'Today', grade: 'A+' },
    { id: 2, name: 'Fatima Khan', email: 'fatima@example.com', progress: 92, lastActive: 'Yesterday', grade: 'A+' },
    { id: 3, name: 'Zainab Malik', email: 'zainab@example.com', progress: 67, lastActive: '2 days ago', grade: 'B' },
    { id: 4, name: 'Omar Farooq', email: 'omar@example.com', progress: 45, lastActive: '3 days ago', grade: 'C' },
    { id: 5, name: 'Sara Shah', email: 'sara@example.com', progress: 78, lastActive: 'Today', grade: 'B+' },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setShowProfileDropdown(false);
    onNavigate('landing');
  };

  // Stats calculations
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const totalLectures = courses.reduce((sum, course) => sum + course.lectures, 0);
  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0);
  const averageRating = courses.length > 0 
    ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
    : '0.0';

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Total Courses</p>
                    <p className="text-3xl font-bold text-teal-600 mt-2">{courses.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">3 Published • 1 Draft</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{totalStudents}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">+12 this week</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Lectures</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{totalLectures}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">+5 this month</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">${totalRevenue}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">+24% from last month</p>
                </div>
              </div>
            </div>

            {/* My Courses Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Courses</h2>
                <button 
                  onClick={() => setActiveTab('courses')}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Course
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        course.status === 'published' ? 'bg-green-100 text-green-800' :
                        course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status}
                      </span>
                      <span className="text-sm text-gray-500">{course.lastUpdated}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.category}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Students</span>
                        <span className="font-medium">{course.students}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lectures</span>
                        <span className="font-medium">{course.lectures}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rating</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedCourse(course)}
                        className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
                      >
                        Manage
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Lectures & Top Students */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Lectures */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Recent Lectures</h3>
                <div className="space-y-4">
                  {lectures.slice(0, 4).map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          lecture.type === 'video' ? 'bg-red-100' :
                          lecture.type === 'pdf' ? 'bg-blue-100' :
                          'bg-green-100'
                        }`}>
                          {lecture.type === 'video' && <Video className="w-5 h-5 text-red-600" />}
                          {lecture.type === 'pdf' && <FileText className="w-5 h-5 text-blue-600" />}
                          {lecture.type === 'quiz' && <Award className="w-5 h-5 text-green-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{lecture.title}</p>
                          <p className="text-sm text-gray-500">{lecture.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{lecture.views} views</p>
                        <p className="text-xs text-gray-500">{lecture.uploadDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('lectures')}
                  className="w-full mt-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50"
                >
                  View All Lectures
                </button>
              </div>

              {/* Top Students */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Top Students</h3>
                <div className="space-y-4">
                  {students.slice(0, 4).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-green-700">{student.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500">Last active: {student.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('students')}
                  className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  View All Students
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="p-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center space-x-3"
                >
                  <Upload className="w-6 h-6" />
                  <span>Upload Lecture</span>
                </button>
                <button 
                  onClick={() => setActiveTab('courses')}
                  className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-3"
                >
                  <Plus className="w-6 h-6" />
                  <span>Create Course</span>
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-3"
                >
                  <BarChart className="w-6 h-6" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Management</h2>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Course
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <p className="text-gray-600">{course.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      course.status === 'published' ? 'bg-green-100 text-green-800' :
                      course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="text-lg font-bold">{course.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lectures</p>
                      <p className="text-lg font-bold">{course.lectures}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-bold">{course.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Revenue</p>
                      <p className="text-lg font-bold text-green-600">${course.revenue}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                      Manage Content
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'lectures':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Lecture Management</h2>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload New Lecture
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lecture Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lectures.map((lecture) => (
                      <tr key={lecture.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                              lecture.type === 'video' ? 'bg-red-100' :
                              lecture.type === 'pdf' ? 'bg-blue-100' :
                              'bg-green-100'
                            }`}>
                              {lecture.type === 'video' && <Video className="w-4 h-4 text-red-600" />}
                              {lecture.type === 'pdf' && <FileText className="w-4 h-4 text-blue-600" />}
                              {lecture.type === 'quiz' && <Award className="w-4 h-4 text-green-600" />}
                            </div>
                            <div className="font-medium">{lecture.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            lecture.type === 'video' ? 'bg-red-100 text-red-800' :
                            lecture.type === 'pdf' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {lecture.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lecture.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lecture.uploadDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 text-gray-400 mr-1" />
                            {lecture.views}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            {lecture.studentsCompleted}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="text-teal-600 hover:text-teal-900">
                              <Download className="w-5 h-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Student Management</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Export CSV
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Send Message
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-5 h-5 text-teal-600" />
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="font-bold">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.grade === 'A+' ? 'bg-green-100 text-green-800' :
                            student.grade === 'A' ? 'bg-green-100 text-green-800' :
                            student.grade === 'B+' ? 'bg-blue-100 text-blue-800' :
                            student.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            student.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {student.grade || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <MessageSquare className="w-5 h-5" />
                            </button>
                            <button className="text-teal-600 hover:text-teal-900">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              <BarChart className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Welcome to Instructor Panel</h2>
            <p className="text-gray-600">Select a section from the sidebar to get started</p>
          </div>
        );
    }
  };

  // Upload Lecture Modal
  const UploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Upload New Lecture</h3>
          <button 
            onClick={() => setShowUploadModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title</label>
            <input 
              type="text" 
              placeholder="Enter lecture title" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
            <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500">
              <option>Select course</option>
              {courses.map(course => (
                <option key={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500">
              <option value="video">Video Lecture</option>
              <option value="pdf">PDF Document</option>
              <option value="quiz">Quiz/Assignment</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Drag & drop or click to upload</p>
              <p className="text-sm text-gray-500 mt-2">Supports: MP4, PDF, DOC, PPT</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowUploadModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Lecture uploaded successfully!');
                setShowUploadModal(false);
              }}
              className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Custom Instructor Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-teal-700 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
                <p className="text-sm text-teal-200">Welcome back, {user?.name || 'Instructor'}!</p>
              </div>
            </div>

            {/* Instructor Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-white/30 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'courses' ? 'bg-white/30 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('lectures')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'lectures' ? 'bg-white/30 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                Lectures
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'students' ? 'bg-white/30 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                Students
              </button>
            </div>

            {/* Instructor Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <span className="hidden md:inline font-medium">{user?.name?.split(' ')[0] || 'Instructor'}</span>
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        Instructor
                      </span>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </button>
                      <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </button>
                      <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Earnings
                      </button>
                      <div className="border-t my-2"></div>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation for Instructor */}
          <div className="md:hidden mt-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'overview' ? 'bg-white/30 backdrop-blur-sm' : 'bg-white/10'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'courses' ? 'bg-white/30 backdrop-blur-sm' : 'bg-white/10'}`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('lectures')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'lectures' ? 'bg-white/30 backdrop-blur-sm' : 'bg-white/10'}`}
              >
                Lectures
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'students' ? 'bg-white/30 backdrop-blur-sm' : 'bg-white/10'}`}
              >
                Students
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {renderContent()}
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && <UploadModal />}

      {/* Logout Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={logout}
          className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center space-x-2 shadow-lg transition hover:shadow-xl"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout from Instructor Account</span>
        </button>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}