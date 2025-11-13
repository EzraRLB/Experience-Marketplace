import { useState } from 'react';
import type { Experience } from '../types/experience';
import DeleteConfirmationModal from './DeleteConfirmationModal';
// filepath: ExperiencesPage.tsx

interface ExperienceModalProps {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
  onExperienceDeleted?: () => void;
}

export default function ExperienceModal({ experience, isOpen, onClose, onExperienceDeleted }: ExperienceModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/experiences/${experience.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onExperienceDeleted?.();
        onClose();
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50 transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100 animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium z-10 shadow-md"
            title="Delete Experience"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
          >
            ×
          </button>
          
          {experience.images.length > 0 && (
            <img
              src={experience.images[0].url}
              alt={experience.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
          )}
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{experience.title}</h1>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-indigo-600">${experience.price}</span>
              {experience.duration && (
                <span className="text-gray-600">{experience.duration}</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{experience.long_description}</p>
            
            {experience.city && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                <p className="text-gray-600">
                  {experience.city.name}, {experience.city.state && `${experience.city.state}, `}{experience.city.country}
                </p>
              </div>
            )}
            
            {experience.host && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Host</h3>
                <p className="text-gray-600">{experience.host.name}</p>
                {experience.host.email && (
                  <a 
                    href={`mailto:${experience.host.email}`}
                    className="text-indigo-600 hover:text-indigo-800 underline text-sm"
                  >
                    {experience.host.email}
                  </a>
                )}
              </div>
            )}
            
            {experience.created_at && (
              <div className="text-sm text-gray-500">
                Created: {new Date(experience.created_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}