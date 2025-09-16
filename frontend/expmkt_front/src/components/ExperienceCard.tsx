import { useState } from 'react';
import type { Experience } from '../types/experience';
import ExperienceModal from './ExperienceModal';
// filepath: ExperienceCard.tsx

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
      {experience.images.length > 0 && (
        <img
          src={experience.images[0].url}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800">{experience.title}</h2>
        <p className="text-gray-600 text-sm mt-2 overflow-hidden">
          {experience.short_description.length > 100 
            ? experience.short_description.substring(0, 100) + '...' 
            : experience.short_description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-indigo-600">${experience.price}</span>
          <span className="text-sm text-gray-500">
            {experience.city ? `${experience.city.name}, ${experience.city.country}` : 'Location TBD'}
          </span>
        </div>
      </div>
    </div>
    
    <ExperienceModal 
      experience={experience}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
}
