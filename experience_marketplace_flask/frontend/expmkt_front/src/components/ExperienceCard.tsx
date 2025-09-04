type Experience = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image?: string; // Optional image URL
};

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer">
      {experience.image && (
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800">{experience.title}</h2>
        <p className="text-gray-600 text-sm mt-2 overflow-hidden">
          {experience.description.length > 100 
            ? experience.description.substring(0, 100) + '...' 
            : experience.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-indigo-600">${experience.price}</span>
          <span className="text-sm text-gray-500">{experience.location}</span>
        </div>
      </div>
    </div>
  );
}
