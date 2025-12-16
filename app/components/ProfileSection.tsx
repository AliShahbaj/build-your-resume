'use client';

import { useState } from 'react';

export default function ProfileSection() {
  const [text, setText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.');
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
      </div>
      
      <div className="w-12 h-0.5 bg-gray-300 mb-6"></div>
      
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded text-gray-600 leading-relaxed min-h-[120px]"
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <div 
          className="relative group"
          onMouseEnter={() => setIsEditing(false)}
        >
          <p className="text-gray-600 leading-relaxed p-3 hover:bg-gray-50 rounded transition-colors">
            {text}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 text-xs rounded"
          >
            Edit
          </button>
        </div>
      )}
    </section>
  );
}