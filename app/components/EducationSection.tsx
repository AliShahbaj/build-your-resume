'use client';

import { useState } from 'react';

interface EducationItem {
  id: number;
  university: string;
  period: string;
  degree: string;
  description: string;
}

export default function EducationSection() {
  // Initial education data
  const initialEducations: EducationItem[] = [
    {
      id: 1,
      university: 'Asian University',
      period: '2005 - 2009',
      degree: 'Bachelors in Science',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      university: 'Asian University',
      period: '2005 - 2009',
      degree: 'Bachelors in Science',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  const [educations, setEducations] = useState<EducationItem[]>(initialEducations);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEducation, setNewEducation] = useState<EducationItem>({
    id: 0,
    university: '',
    period: '',
    degree: '',
    description: ''
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Start editing an education item
  const startEditing = (id: number) => {
    const educationToEdit = educations.find(edu => edu.id === id);
    if (educationToEdit) {
      setNewEducation({ ...educationToEdit });
      setEditingId(id);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setNewEducation({
      id: 0,
      university: '',
      period: '',
      degree: '',
      description: ''
    });
  };

  // Save changes
  const saveChanges = () => {
    if (isAddingNew) {
      // Add new education
      const newId = Math.max(...educations.map(e => e.id), 0) + 1;
      setEducations([...educations, { ...newEducation, id: newId }]);
      setIsAddingNew(false);
    } else if (editingId) {
      // Update existing education
      setEducations(educations.map(edu =>
        edu.id === editingId ? { ...newEducation, id: editingId } : edu
      ));
      setEditingId(null);
    }

    // Reset form
    setNewEducation({
      id: 0,
      university: '',
      period: '',
      degree: '',
      description: ''
    });
  };

  // Delete an education item
  const deleteEducation = (id: number) => {
    setEducations(educations.filter(edu => edu.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Start adding new education
  const startAddingNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setNewEducation({
      id: 0,
      university: '',
      period: '',
      degree: '',
      description: ''
    });
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={startAddingNew}
          className="flex items-center gap-1 text-sm bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Education
        </button>
      </div>
      
      <div className="w-12 h-0.5 bg-gray-300 mb-6"></div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="mb-8 p-6 border border-gray-300 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University
              </label>
              <input
                type="text"
                name="university"
                value={newEducation.university}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="University name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <input
                type="text"
                name="period"
                value={newEducation.period}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="e.g., 2005 - 2009"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="e.g., Bachelors in Science"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newEducation.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-800 focus:border-transparent min-h-[100px]"
                placeholder="Description of your education..."
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              {isAddingNew ? 'Add Education' : 'Save Changes'}
            </button>
            <button
              onClick={cancelEditing}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            {editingId && !isAddingNew && (
              <button
                onClick={() => deleteEducation(editingId)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors ml-auto"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}

      {/* Education List */}
      <div className="space-y-8">
        {educations.map((edu) => (
          <div 
            key={edu.id} 
            className="relative group grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Edit button - appears on hover */}
            <button
              onClick={() => startEditing(edu.id)}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>

            {/* Delete button - appears on hover */}
            <button
              onClick={() => deleteEducation(edu.id)}
              className="absolute top-4 right-24 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-md hover:bg-red-200 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            {/* Left column - University, Period, Degree */}
            <div className="md:col-span-1">
              <h3 className="font-bold text-gray-900 text-lg">{edu.university}</h3>
              <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
              <p className="text-gray-700 font-medium mt-2">{edu.degree}</p>
            </div>
            
            {/* Right column - Description */}
            <div className="md:col-span-3">
              <p className="text-gray-600 leading-relaxed">
                {edu.description}
              </p>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {educations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <p>No education entries yet. Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </section>
  );
}