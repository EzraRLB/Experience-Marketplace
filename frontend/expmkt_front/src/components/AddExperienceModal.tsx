import { useState } from 'react';
import Tooltip from './Tooltip';
import AutocompleteInput from './AutocompleteInput';

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExperienceAdded: () => void;
}

export default function AddExperienceModal({ isOpen, onClose, onExperienceAdded }: AddExperienceModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    long_description: '',
    price: '0.00',
    duration: '',
    city_name: '',
    city_country: '',
    city_state: '',
    host_name: '',
    host_email: '',
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          short_description: '',
          long_description: '',
          price: '0.00',
          duration: '',
          city_name: '',
          city_country: '',
          city_state: '',
          host_name: '',
          host_email: '',
          image_url: ''
        });
        onExperienceAdded();
        onClose();
      } else {
        console.error('Failed to create experience');
      }
    } catch (error) {
      console.error('Error creating experience:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle price formatting
    if (name === 'price') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const formattedPrice = (parseInt(numericValue || '0') / 100).toFixed(2);
      if (formattedPrice.length > 10) return; // Max 10 characters total
      setFormData({ ...formData, price: formattedPrice });
      return;
    }
    
    // Enforce character limits for other fields
    setFormData({
      ...formData,
      [name]: value
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50 transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
          >
            ×
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Experience</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Tooltip content="This will be displayed on the Experience Thumbnail. Write an engaging title.">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              </Tooltip>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <div className={`text-xs mt-1 text-right ${
                50 - formData.title.length <= 5 ? 'text-red-500' : 'text-gray-400'
              }`}>
                {50 - formData.title.length} characters remaining
              </div>
            </div>

            <div>
              <Tooltip content="Brief summary that appears on the experience card. Keep it concise and appealing.">
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              </Tooltip>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                maxLength={50}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <div className={`text-xs mt-1 text-right ${
                50 - formData.short_description.length <= 5 ? 'text-red-500' : 'text-gray-400'
              }`}>
                {50 - formData.short_description.length} characters remaining
              </div>
            </div>

            <div>
              <Tooltip content="Detailed description of the experience. Include what participants will do and learn.">
                <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
              </Tooltip>
              <textarea
                name="long_description"
                value={formData.long_description}
                onChange={handleChange}
                maxLength={350}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <div className={`text-xs mt-1 text-right ${
                350 - formData.long_description.length <= 35 ? 'text-red-500' : 'text-gray-400'
              }`}>
                {350 - formData.long_description.length} characters remaining
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Tooltip content="Price per person in USD. Use decimal format for cents (e.g., 25.99).">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                </Tooltip>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <div className={`text-xs mt-1 text-right ${
                  10 - formData.price.length <= 1 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {10 - formData.price.length} characters remaining
                </div>
              </div>
              <div>
                <Tooltip content="How long the experience lasts. Maximum 24 hours allowed.">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                </Tooltip>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select duration</option>
                  {Array.from({ length: 24 }, (_, i) => i + 1).map(hour => (
                    <option key={hour} value={`${hour} hour${hour > 1 ? 's' : ''}`}>
                      {hour} hour{hour > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Tooltip content="The city where this experience takes place.">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                </Tooltip>
                <AutocompleteInput
                  name="city_name"
                  value={formData.city_name}
                  onChange={handleChange}
                  apiEndpoint="cities"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <Tooltip content="The country where this experience is located.">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                </Tooltip>
                <AutocompleteInput
                  name="city_country"
                  value={formData.city_country}
                  onChange={handleChange}
                  apiEndpoint="countries"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <Tooltip content="State or province (optional). Useful for countries with states/provinces.">
                <label className="block text-sm font-medium text-gray-700 mb-1">State (Optional)</label>
              </Tooltip>
              <AutocompleteInput
                name="city_state"
                value={formData.city_state}
                onChange={handleChange}
                apiEndpoint="states"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Tooltip content="Name of the person or organization hosting this experience.">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Host Name</label>
                </Tooltip>
                <input
                  type="text"
                  name="host_name"
                  value={formData.host_name}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className={`text-xs mt-1 text-right ${
                  100 - formData.host_name.length <= 10 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {100 - formData.host_name.length} characters remaining
                </div>
              </div>
              <div>
                <Tooltip content="Contact email for the host. This will be used for bookings and inquiries.">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Host Email</label>
                </Tooltip>
                <input
                  type="email"
                  name="host_email"
                  value={formData.host_email}
                  onChange={handleChange}
                  maxLength={80}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className={`text-xs mt-1 text-right ${
                  80 - formData.host_email.length <= 8 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {80 - formData.host_email.length} characters remaining
                </div>
              </div>
            </div>

            <div>
              <Tooltip content="URL of an image that represents this experience. Use high-quality, relevant images.">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              </Tooltip>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Create Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}