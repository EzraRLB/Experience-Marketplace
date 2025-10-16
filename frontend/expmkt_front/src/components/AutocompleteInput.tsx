import { useState, useEffect } from 'react';

interface AutocompleteInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  apiEndpoint: string;
}

export default function AutocompleteInput({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  className, 
  required, 
  apiEndpoint 
}: AutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/${apiEndpoint}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    fetchSuggestions();
  }, [apiEndpoint]);

  const toPascalCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pascalValue = toPascalCase(e.target.value);
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: pascalValue
      }
    };
    onChange(syntheticEvent);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const syntheticEvent = {
      target: { name, value: suggestion }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(value.toLowerCase()) && s !== value
  );

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className={className}
        required={required}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}