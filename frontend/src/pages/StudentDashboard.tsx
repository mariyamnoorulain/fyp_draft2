import { useEffect, useState } from 'react';
import { User, BookOpen, BarChart3, FileText, LogOut, Bell, ChevronDown } from 'lucide-react';
import Overview from './Overview';
import type { Page } from '../types';

interface Course {
  id: number;
  name: string;
  teacher: string;
  progress: number;
  attendance: number;
}

interface Props {
  onNavigate: (page: Page) => void;
}

export default function StudentDashboard({ onNavigate }: Props) {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsedUser = JSON.parse(saved);
        setUser(parsedUser);

        setCourses([
          { id: 1, name: 'AI Powered Learning', teacher: 'Dr. Fariha', progress: 65, attendance: 90 },
          { id: 2, name: 'Interactive Video Ecosystem', teacher: 'Mr. Ali', progress: 40, attendance: 85 },
          { id: 3, name: 'Web Development', teacher: 'Ms. Sara', progress: 80, attendance: 95 },
        ]);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileDropdown(false);
    onNavigate('landing');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-[#1e3a5f] text-white min-h-screen flex flex-col fixed left-0 top-0 h-full z-40">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold">AI learning</span>
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name || 'Student'}</p>
                <p className="text-xs text-gray-300">Student</p>
              </div>
            </div>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600'
                      : 'hover:bg-blue-600/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600/50 transition-colors text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 ml-64">
        <div className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h1>
            </div>

            <div className="flex items-center gap-6">
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  2
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{user?.name || 'Student'}</p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-teal-600" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        Student
                      </span>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                      <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
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
        </div>

        <div>
          {activeTab === 'overview' && <Overview userName={user?.name || 'Student'} />}
          {activeTab === 'courses' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Teacher:</span> {course.teacher}
                      </p>
                      <div>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Progress:</span> {course.progress}%
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-teal-600 h-2.5 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Attendance:</span> {course.attendance}%
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${course.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Viewing details for ${course.name}`)}
                      className="mt-6 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'performance' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Performance</h2>
              <p className="text-gray-600">Your performance metrics will appear here.</p>
            </div>
          )}
          {activeTab === 'notes' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Notes</h2>
              <p className="text-gray-600">Your study notes will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
