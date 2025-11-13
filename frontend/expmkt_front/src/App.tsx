import { useState } from 'react';
import SignInPage from "./pages/SignInPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import InsightsPage from "./pages/InsightsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState('experiences');

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <SignInPage onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md p-4 flex items-center relative">
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <button
                onClick={() => { setCurrentPage('experiences'); setShowMenu(false); }}
                className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  user?.role === 'admin' ? 'rounded-t-md' : 'rounded-md'
                }`}
              >
                Experiences
              </button>
              {user?.role === 'admin' && (
                <button
                  onClick={() => { setCurrentPage('insights'); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-md"
                >
                  Insights
                </button>
              )}
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-indigo-600 flex-1 text-center">Experience Marketplace</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </header>
      <main>
        {currentPage === 'experiences' && <ExperiencesPage />}
        {currentPage === 'insights' && <InsightsPage />}
      </main>
    </div>
  );
}

export default App;