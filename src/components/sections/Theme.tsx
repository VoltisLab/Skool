// export default function Theme() {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Theme</h1>
//       <p className="text-gray-500">Theme settings will be displayed here.</p>
//     </div>
//   )
// } 

'use client';

import { useState, useEffect } from 'react';

const themeOptions = ['Light (default)', 'Dark', 'System'];

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState('Light (default)');
  const [originalTheme, setOriginalTheme] = useState('Light (default)');
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    // You could fetch current theme from localStorage/API here
    setOriginalTheme('Light (default)');
  }, []);

  const handleChange = (value: string) => {
    setSelectedTheme(value);
    setChanged(value !== originalTheme);
  };

  const handleSave = () => {
    // Save the selected theme
    console.log('Saved theme:', selectedTheme);
    setOriginalTheme(selectedTheme);
    setChanged(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Theme</h2>
      </div>

      <div>
        <label htmlFor="theme" className="block text-sm text-gray-700 mb-1">
          Theme
        </label>
        <select
          id="theme"
          value={selectedTheme}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          {themeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={!changed}
        className={`w-full py-2 text-sm font-semibold rounded-md transition ${
          changed
            ? 'bg-black text-white hover:bg-[#2a2a5a]'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        SAVE
      </button>
    </div>
  );
}
