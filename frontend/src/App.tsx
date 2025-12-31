import { useState, useEffect } from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';           // ← NAYA ADD
import Instructor from './pages/Instructor';     // ← NAYA ADD
import Contact from './pages/Contact';           // ← NAYA ADD
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Types
import type { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedPage = localStorage.getItem('currentPage');

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        if (savedPage) {
          setCurrentPage(savedPage as Page);
        } else {
          const role = parsedUser.role;
          if (role === 'student') setCurrentPage('studentDashboard');
          else if (role === 'instructor') setCurrentPage('instructorDashboard');
          else if (role === 'admin') setCurrentPage('adminDashboard');
        }
      } catch {
        setCurrentPage('landing');
      }
    }
    setIsLoading(false);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hideLayout =
    currentPage === 'login' ||
    currentPage === 'signup' ||
    currentPage === 'studentDashboard' ||
    currentPage === 'instructorDashboard' ||
    currentPage === 'coursedetails' ||
    currentPage === 'adminDashboard';

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      {!hideLayout && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {/* ROUTING */}
      {currentPage === 'landing' && <Landing onNavigate={handleNavigate} />}

      {currentPage === 'login' && (
        <Login onNavigate={handleNavigate} setUser={setUser} />
      )}

      {currentPage === 'signup' && (
        <Signup onNavigate={handleNavigate} />
      )}

      {/* NAYE PAGES ADD */}
      {currentPage === 'courses' && <Courses onNavigate={handleNavigate} />}
      {currentPage === 'instructor' && <Instructor onNavigate={handleNavigate} />}
      {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}

      {currentPage === 'studentDashboard' && <StudentDashboard onNavigate={handleNavigate} />}
      {currentPage === 'instructorDashboard' && <InstructorDashboard onNavigate={handleNavigate} />}
      {currentPage === 'adminDashboard' && <AdminDashboard onNavigate={handleNavigate} />}

      {/* FOOTER */}
      {!hideLayout && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;