import { useEffect, useState } from "react";
import ExperienceCard from "../components/ExperienceCard";
import type { Experience } from '../types/experience';
// filepath: ExperiencesPage.tsx

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/experiences")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch experiences");
        return res.json();
      })
      .then((data: Experience[]) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-500 text-lg">Loading experiences...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-500 text-lg">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">Available Experiences</h1>
        {experiences.length === 0 ? (
          <p className="text-gray-500 text-lg">No experiences available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
