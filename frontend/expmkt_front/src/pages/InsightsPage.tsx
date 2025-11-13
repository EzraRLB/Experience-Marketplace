import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface StateCount {
  state: string;
  count: number;
}

interface ExperienceLocation {
  id: number;
  title: string;
  city: string;
  lat: number;
  lng: number;
}

export default function InsightsPage() {
  const [stateData, setStateData] = useState<StateCount[]>([]);
  const [experienceLocations, setExperienceLocations] = useState<ExperienceLocation[]>([]);
  const [daysSinceLastExperience, setDaysSinceLastExperience] = useState<number>(0);
  const [experiencesToday, setExperiencesToday] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch experiences for state histogram
        const expResponse = await fetch('http://127.0.0.1:5000/api/experiences');
        const experiences = await expResponse.json();
        
        const stateCounts: { [key: string]: number } = {};
        experiences.forEach((exp: any) => {
          const state = exp.city?.state || 'No State';
          stateCounts[state] = (stateCounts[state] || 0) + 1;
        });
        
        const stateData = Object.entries(stateCounts).map(([state, count]) => ({
          state,
          count
        }));
        
        // Fetch experience locations for map
        const locResponse = await fetch('http://127.0.0.1:5000/api/experience-locations');
        const locations = await locResponse.json();
        
        // Calculate days since last experience
        const sortedExperiences = experiences.sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        if (sortedExperiences.length > 0) {
          const lastExperienceDate = new Date(sortedExperiences[0].created_at);
          const today = new Date();
          const diffTime = Math.abs(today.getTime() - lastExperienceDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysSinceLastExperience(diffDays);
        }
        
        // Calculate experiences added today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        
        const todayExperiences = experiences.filter((exp: any) => {
          const expDate = new Date(exp.created_at);
          return expDate >= todayStart && expDate <= todayEnd;
        });
        
        setExperiencesToday(todayExperiences.length);
        
        setStateData(stateData);
        setExperienceLocations(locations);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Insights</h1>
      
      {/* Alert Dashboard */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Alert Dashboard</h2>
        {loading ? (
          <p className="text-gray-600">Loading alerts...</p>
        ) : (
          <div className="space-y-3">
            {/* Today's experiences alert */}
            {experiencesToday > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800 font-medium">Daily Activity</span>
                </div>
                <p className="text-blue-700 text-sm mt-1 ml-7">
                  {experiencesToday} experience{experiencesToday !== 1 ? 's' : ''} added today
                </p>
              </div>
            )}
            
            {daysSinceLastExperience > 7 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-yellow-800 font-medium">Content Alert</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1 ml-7">
                  {daysSinceLastExperience} days since last experience was added
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 font-medium">No new alerts</span>
                </div>
                <p className="text-green-700 text-sm mt-1 ml-7">All systems are running normally</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Experiences by State</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience Locations</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="h-[500px]">
            <MapContainer center={[20.915, -100.750]} zoom={6} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {experienceLocations.map((location) => (
                <Marker key={location.id} position={[location.lat, location.lng]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{location.title}</h3>
                      <p className="text-sm text-gray-600">{location.city}, {location.country}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}