'use client';

import { useState } from 'react';

// Define the Experience type
interface Experience {
  id: number;
  title: string;
  period: string;
  company: string;
  description: string;
  isEditing?: boolean;
}

// Define type for new experience form
interface NewExperienceForm {
  title: string;
  period: string;
  company: string;
  description: string;
}

export default function ExperienceSection() {
  // Initial experiences data
  const initialExperiences: Experience[] = [
    {
      id: 1,
      title: 'Senior Designer',
      period: '2000 - 2000',
      company: 'Company Name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      title: 'Senior Designer',
      period: '2000 - 2000',
      company: 'Company Name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 3,
      title: 'Senior Designer',
      period: '2000 - 2000',
      company: 'Company Name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // State for new experience form
  const [newExperience, setNewExperience] = useState<NewExperienceForm>({
    title: 'New Position',
    period: 'YYYY - YYYY',
    company: 'Company Name',
    description: 'Description of your role and achievements.'
  });

  // Handle new experience form changes
  const handleNewExperienceChange = (field: keyof NewExperienceForm, value: string) => {
    setNewExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new experience
  const handleAdd = () => {
    if (experiences.length >= 3) {
      alert('Maximum 3 experiences allowed');
      return;
    }
    
    const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    const experienceToAdd: Experience = {
      id: newId,
      title: newExperience.title,
      period: newExperience.period,
      company: newExperience.company,
      description: newExperience.description,
      isEditing: false
    };
    
    setExperiences([...experiences, experienceToAdd]);
    setIsAdding(false);
    
    // Reset form to default values
    setNewExperience({
      title: 'New Position',
      period: 'YYYY - YYYY',
      company: 'Company Name',
      description: 'Description of your role and achievements.'
    });
  };

  // Delete experience
  const handleDelete = (id: number) => {
    if (experiences.length <= 1) {
      alert('At least one experience is required');
      return;
    }
    
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  // Toggle edit mode for an experience
  const toggleEdit = (id: number) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, isEditing: !exp.isEditing } : exp
    ));
  };

  // Update experience field
  const updateExperience = (id: number, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  // Save all changes and exit edit modes
  const handleSaveAll = () => {
    setExperiences(experiences.map(exp => ({ ...exp, isEditing: false })));
  };

  // Cancel adding new experience
  const handleCancelAdd = () => {
    setIsAdding(false);
    // Reset form to default values
    setNewExperience({
      title: 'New Position',
      period: 'YYYY - YYYY',
      company: 'Company Name',
      description: 'Description of your role and achievements.'
    });
  };

  return (
    <section 
      className="mb-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
        
        {/* Action buttons (show on hover) */}
        {isHovering && (
          <div className="flex gap-2">
            {!isAdding && experiences.length < 3 && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Experience
              </button>
            )}
            
            {experiences.some(exp => exp.isEditing) && (
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-1 text-sm bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save All
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="w-12 h-0.5 bg-gray-300 mb-6"></div>
      
      {/* Add New Experience Form */}
      {isAdding && (
        <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1 space-y-3">
              <input
                type="text"
                placeholder="Job Title"
                className="w-full p-2 border border-gray-300 rounded text-gray-900 font-bold focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={newExperience.title}
                onChange={(e) => handleNewExperienceChange('title', e.target.value)}
              />
              <input
                type="text"
                placeholder="Period (YYYY - YYYY)"
                className="w-full p-2 border border-gray-300 rounded text-gray-500 text-sm focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={newExperience.period}
                onChange={(e) => handleNewExperienceChange('period', e.target.value)}
              />
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-2 border border-gray-300 rounded text-gray-700 font-medium focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={newExperience.company}
                onChange={(e) => handleNewExperienceChange('company', e.target.value)}
              />
            </div>
            <div className="md:col-span-3">
              <textarea
                placeholder="Description of your role and achievements..."
                className="w-full p-3 border border-gray-300 rounded text-gray-600 leading-relaxed min-h-[100px] focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={newExperience.description}
                onChange={(e) => handleNewExperienceChange('description', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Add Experience
            </button>
            <button
              onClick={handleCancelAdd}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Experiences List */}
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div 
            key={exp.id} 
            className="group relative grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Edit/Delete buttons (hover only) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleEdit(exp.id)}
                className="p-1.5 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                title={exp.isEditing ? "Save" : "Edit"}
              >
                {exp.isEditing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )}
              </button>
              
              {experiences.length > 1 && (
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Left Column - Job Details */}
            <div className="md:col-span-1 space-y-3">
              {exp.isEditing ? (
                <>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-gray-900 font-bold focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-gray-500 text-sm focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    placeholder="Period (YYYY - YYYY)"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700 font-medium focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </>
              ) : (
                <>
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-gray-500 text-sm">{exp.period}</p>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                </>
              )}
            </div>
            
            {/* Right Column - Description */}
            <div className="md:col-span-3">
              {exp.isEditing ? (
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded text-gray-600 leading-relaxed min-h-[100px] focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="Description of your role and achievements..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Max limit message */}
      {/* {experiences.length >= 3 && !isAdding && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 italic">
            Maximum of 3 experiences reached
          </p>
        </div>
      )} */}
    </section>
  );
}