'use client';

import { useState } from 'react';
import ProgressBar from './ProgressBar';

interface Skill {
  id: number;
  skill: string;
  percentage: number;
}

export default function ExpertiseSection() {
  const initialSkills: Skill[] = [
    { id: 1, skill: 'Premiere Pro', percentage: 90 },
    { id: 2, skill: 'Photoshop', percentage: 95 },
    { id: 3, skill: 'After Effect', percentage: 85 },
    { id: 4, skill: 'Illustrator', percentage: 88 }
  ];

  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [hoveredSkillId, setHoveredSkillId] = useState<number | null>(null);

  // Start editing a skill
  const startEditing = (skill: Skill) => {
    setEditingSkill({ ...skill });
    setIsAddingNew(false);
  };

  // Start adding a new skill
  const startAddingNew = () => {
    setEditingSkill({ id: 0, skill: '', percentage: 50 });
    setIsAddingNew(true);
  };

  // Save changes
  const saveChanges = () => {
    if (!editingSkill) return;

    if (isAddingNew) {
      // Add new skill
      const newId = Math.max(...skills.map(s => s.id), 0) + 1;
      setSkills([...skills, { ...editingSkill, id: newId }]);
    } else {
      // Update existing skill
      setSkills(skills.map(s => 
        s.id === editingSkill.id ? editingSkill : s
      ));
    }

    // Reset
    setEditingSkill(null);
    setIsAddingNew(false);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingSkill(null);
    setIsAddingNew(false);
  };

  // Delete a skill
  const deleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    if (editingSkill?.id === id) {
      cancelEditing();
    }
  };

  // Update editing skill value
  const updateEditingSkill = (field: keyof Skill, value: string | number) => {
    if (!editingSkill) return;
    
    if (field === 'percentage') {
      const numValue = Math.min(100, Math.max(0, Number(value)));
      setEditingSkill({ ...editingSkill, [field]: numValue });
    } else {
      setEditingSkill({ ...editingSkill, [field]: value });
    }
  };

  // Handle percentage slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEditingSkill('percentage', parseInt(e.target.value));
  };

  // Handle skill name change
  const handleSkillNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEditingSkill('skill', e.target.value);
  };

  // Split skills into two columns
  const leftColumnSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const rightColumnSkills = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-900">Expertise</h2>
        <button
          onClick={startAddingNew}
          className="flex items-center gap-1 text-sm bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Skill
        </button>
      </div>
      
      <div className="w-12 h-0.5 bg-gray-300 mb-6"></div>

      {/* Add/Edit Form */}
      {editingSkill && (
        <div className="mb-8 p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-4">
            {isAddingNew ? 'Add New Skill' : 'Edit Skill'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                value={editingSkill.skill}
                onChange={handleSkillNameChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="e.g., JavaScript, Photoshop, etc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency: {editingSkill.percentage}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={editingSkill.percentage}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              {isAddingNew ? 'Add Skill' : 'Save Changes'}
            </button>
            <button
              onClick={cancelEditing}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            {!isAddingNew && editingSkill.id > 0 && (
              <button
                onClick={() => deleteSkill(editingSkill.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors ml-auto"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {leftColumnSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="relative group"
              onMouseEnter={() => setHoveredSkillId(skill.id)}
              onMouseLeave={() => setHoveredSkillId(null)}
            >
              {/* Edit button overlay */}
              {hoveredSkillId === skill.id && (
                <div className="absolute -top-2 -right-2 flex gap-1 z-10">
                  <button
                    onClick={() => startEditing(skill)}
                    className="flex items-center gap-1 text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Progress bar with hover effect */}
              <div className={`transition-all duration-200 ${hoveredSkillId === skill.id ? 'scale-[1.02]' : ''}`}>
                <ProgressBar skill={skill.skill} percentage={skill.percentage} />
              </div>
            </div>
          ))}
          
          {/* Add button placeholder for left column if odd number of skills */}
          {skills.length % 2 !== 0 && leftColumnSkills.length > rightColumnSkills.length && (
            <div className="h-12 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <button
                onClick={startAddingNew}
                className="flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Skill
              </button>
            </div>
          )}
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {rightColumnSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="relative group"
              onMouseEnter={() => setHoveredSkillId(skill.id)}
              onMouseLeave={() => setHoveredSkillId(null)}
            >
              {/* Edit button overlay */}
              {hoveredSkillId === skill.id && (
                <div className="absolute -top-2 -right-2 flex gap-1 z-10">
                  <button
                    onClick={() => startEditing(skill)}
                    className="flex items-center gap-1 text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Progress bar with hover effect */}
              <div className={`transition-all duration-200 ${hoveredSkillId === skill.id ? 'scale-[1.02]' : ''}`}>
                <ProgressBar skill={skill.skill} percentage={skill.percentage} />
              </div>
            </div>
          ))}
          
          {/* Add button placeholder for right column if empty or even number */}
          {rightColumnSkills.length === 0 && (
            <div className="h-12 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <button
                onClick={startAddingNew}
                className="flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Skill
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Empty state */}
      {skills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-gray-500 mb-4">No skills added yet.</p>
          <button
            onClick={startAddingNew}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Add Your First Skill
          </button>
        </div>
      )}

      {/* Custom slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          background-color: #374151;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background-color: #374151;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
}