type Experience = {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  price: number;
  duration?: string;
  created_at?: string;
  city?: {
    id: number;
    name: string;
    country: string;
    state?: string;
  };
  host?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  images: Array<{
    id: number;
    url: string;
  }>;
};

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer">
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
  );
}
