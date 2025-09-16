import ExperiencesPage from "./pages/ExperiencesPage";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-indigo-600 text-center">Experience Marketplace</h1>
      </header>
      <main>
        <ExperiencesPage />
      </main>
    </div>
  );
}

export default App;