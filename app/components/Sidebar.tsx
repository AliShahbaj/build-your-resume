'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ProgressBar from './ProgressBar';

interface Language {
  id: number;
  name: string;
  level: number;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface SocialLink {
  id: number;
  platform: string;
  icon: string;
  url: string;
}

export default function Sidebar() {

   // Profile image state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileInitials, setProfileInitials] = useState('JD');
  const [isEditingImage, setIsEditingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initial states
  const [name, setName] = useState('John Doe');
  const [role, setRole] = useState('SENIOR DESIGNER');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  // Contact info
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'info@yourmail.com',
    phone: '+0000 1234 5678',
    address: 'New York City - 000'
  });
  const [editingContactField, setEditingContactField] = useState<keyof ContactInfo | null>(null);
  const [tempContactValue, setTempContactValue] = useState('');
  
  // Languages
  const initialLanguages: Language[] = [
    { id: 1, name: 'English', level: 100 },
    { id: 2, name: 'Urdu', level: 80 },
    { id: 3, name: 'Spanish', level: 60 }
  ];
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  
  // Social links
  const initialSocialLinks: SocialLink[] = [
    { id: 1, platform: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
    { id: 2, platform: 'Twitter', icon: 'fab fa-twitter', url: '#' },
    { id: 3, platform: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
    { id: 4, platform: 'Dribbble', icon: 'fab fa-dribbble', url: '#' }
  ];
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);

  // Name & Role handlers
  const handleSaveName = () => {
    setIsEditingName(false);
    setProfileInitials(generateInitials(name));
  };

  const handleSaveRole = () => {
    setIsEditingRole(false);
  };

  // Contact info handlers
  const startEditingContact = (field: keyof ContactInfo, value: string) => {
    setEditingContactField(field);
    setTempContactValue(value);
  };

  const saveContactEdit = () => {
    if (editingContactField) {
      setContactInfo(prev => ({
        ...prev,
        [editingContactField]: tempContactValue
      }));
    }
    setEditingContactField(null);
  };

  const cancelContactEdit = () => {
    setEditingContactField(null);
  };

  // Language handlers
  const startEditingLanguage = (language: Language) => {
    setEditingLanguage({ ...language });
    setIsAddingLanguage(false);
  };

  const startAddingLanguage = () => {
    setEditingLanguage({ id: 0, name: '', level: 50 });
    setIsAddingLanguage(true);
  };

  const saveLanguage = () => {
    if (!editingLanguage) return;

    if (isAddingLanguage) {
      const newId = Math.max(...languages.map(l => l.id), 0) + 1;
      setLanguages([...languages, { ...editingLanguage, id: newId }]);
    } else {
      setLanguages(languages.map(l => 
        l.id === editingLanguage.id ? editingLanguage : l
      ));
    }

    setEditingLanguage(null);
    setIsAddingLanguage(false);
  };

  const cancelLanguageEdit = () => {
    setEditingLanguage(null);
    setIsAddingLanguage(false);
  };

  const deleteLanguage = (id: number) => {
    setLanguages(languages.filter(l => l.id !== id));
    if (editingLanguage?.id === id) {
      cancelLanguageEdit();
    }
  };

  const updateEditingLanguage = (field: keyof Language, value: string | number) => {
    if (!editingLanguage) return;
    
    if (field === 'level') {
      const numValue = Math.min(100, Math.max(0, Number(value)));
      setEditingLanguage({ ...editingLanguage, [field]: numValue });
    } else {
      setEditingLanguage({ ...editingLanguage, [field]: value });
    }
  };

  // Social link handlers
  const startEditingSocialLink = (link: SocialLink) => {
    setEditingSocialLink({ ...link });
  };

  const saveSocialLink = () => {
    if (!editingSocialLink) return;

    setSocialLinks(socialLinks.map(l => 
      l.id === editingSocialLink.id ? editingSocialLink : l
    ));
    setEditingSocialLink(null);
  };

  const cancelSocialLinkEdit = () => {
    setEditingSocialLink(null);
  };

  const updateEditingSocialLink = (field: keyof SocialLink, value: string) => {
    if (!editingSocialLink) return;
    setEditingSocialLink({ ...editingSocialLink, [field]: value });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
        setIsEditingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Handle remove image
  const handleRemoveImage = () => {
    setProfileImage(null);
    setIsEditingImage(false);
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // Generate initials from name
  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };


  return (
    <div className="col-span-12 md:col-span-4 bg-gray-800 text-white p-8 md:p-10">
      {/* Profile Image - Static for now */}
      <div 
        className="mb-8 relative group"
        onMouseEnter={() => setHoveredSection('image')}
        onMouseLeave={() => setHoveredSection(null)}
      >
        {/* Edit button overlay */}
        {hoveredSection === 'image' && !isEditingImage && (
          <button
            onClick={() => setIsEditingImage(true)}
            className="absolute top-2 right-2 z-10 bg-gray-800/90 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Change Photo
          </button>
        )}
        
        {/* Profile Image Container */}
        <div className="w-40 h-40 md:w-full md:h-64 bg-gray-700 mx-auto md:mx-0 overflow-hidden rounded-lg relative">
          {/* Display uploaded image or initials */}
          {profileImage ? (
            <div className="w-full h-full relative">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 100vw"
              />
              
              {/* Remove image button */}
              {isEditingImage && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
                  <button
                    onClick={handleRemoveImage}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors mb-2"
                  >
                    Remove Photo
                  </button>
                  <button
                    onClick={triggerFileInput}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Upload New
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
              <span className="text-gray-300 text-4xl">{profileInitials}</span>
              
              {/* Upload overlay when editing */}
              {isEditingImage && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
                  <button
                    onClick={triggerFileInput}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors mb-2"
                  >
                    Upload Photo
                  </button>
                  <button
                    onClick={() => setIsEditingImage(false)}
                    className="text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        
        {/* Image upload instructions */}
        {isEditingImage && (
          <div className="mt-3 text-center text-gray-400 text-sm">
            <p>Recommended: Square image, at least 400x400 pixels</p>
            <p>Max file size: 5MB</p>
          </div>
        )}
      </div>
      {/* <div className="mb-8">
        <div className="w-40 h-40 md:w-full md:h-64 bg-gray-700 mx-auto md:mx-0 overflow-hidden rounded-lg">
          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
            <span className="text-gray-300 text-4xl">JD</span>
          </div>
        </div>
      </div> */}
      
      {/* Name & Role */}
      <div 
        className="mb-8 relative group"
        onMouseEnter={() => setHoveredSection('name-role')}
        onMouseLeave={() => setHoveredSection(null)}
      >
        {isEditingName ? (
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white text-3xl md:text-4xl font-extrabold"
              onBlur={handleSaveName}
              autoFocus
            />
          </div>
        ) : (
          <div className="relative">
            <h1 
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 cursor-pointer hover:bg-gray-700 p-2 -m-2 rounded"
              onClick={() => setIsEditingName(true)}
            >
              {name}
            </h1>
            {hoveredSection === 'name-role' && (
              <button
                onClick={() => setIsEditingName(true)}
                className="absolute top-0 right-0 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Edit Name
              </button>
            )}
          </div>
        )}

        <div className="w-12 h-0.5 bg-gray-600 mb-3"></div>

        {isEditingRole ? (
          <div>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value.toUpperCase())}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300 text-lg font-medium"
              onBlur={handleSaveRole}
              autoFocus
            />
          </div>
        ) : (
          <div className="relative">
            <p 
              className="text-gray-300 text-lg font-medium cursor-pointer hover:bg-gray-700 p-2 -m-2 rounded"
              onClick={() => setIsEditingRole(true)}
            >
              {role}
            </p>
            {hoveredSection === 'name-role' && (
              <button
                onClick={() => setIsEditingRole(true)}
                className="absolute top-0 right-0 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Edit Role
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Social Icons */}
      {/* <div 
        className="mb-8 relative group"
        onMouseEnter={() => setHoveredSection('social')}
        onMouseLeave={() => setHoveredSection(null)}
      >
        {hoveredSection === 'social' && (
          <div className="absolute -top-2 -right-2">
            <button
              onClick={() => startEditingSocialLink(socialLinks[0])}
              className="text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Edit Social
            </button>
          </div>
        )}
        
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              className="text-gray-300 hover:text-white transition relative group/link"
              title={link.platform}
            >
              <i className={link.icon + " text-xl"}></i>
              {editingSocialLink?.id === link.id ? (
                <div className="absolute top-full left-0 mt-2 p-2 bg-gray-700 rounded shadow-lg z-10 min-w-[200px]">
                  <input
                    type="text"
                    value={editingSocialLink.platform}
                    onChange={(e) => updateEditingSocialLink('platform', e.target.value)}
                    className="w-full p-1 bg-gray-600 border border-gray-500 rounded text-white text-sm mb-2"
                    placeholder="Platform name"
                  />
                  <input
                    type="text"
                    value={editingSocialLink.url}
                    onChange={(e) => updateEditingSocialLink('url', e.target.value)}
                    className="w-full p-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                    placeholder="URL"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveSocialLink}
                      className="text-xs bg-gray-800 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelSocialLinkEdit}
                      className="text-xs bg-gray-600 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    startEditingSocialLink(link);
                  }}
                  className="absolute -top-1 -right-1 text-xs bg-gray-700 text-white px-1 py-0.5 rounded opacity-0 group-hover/link:opacity-100 transition-opacity"
                >
                  Edit
                </button>
              )}
            </a>
          ))}
        </div>
      </div> */}

      {/* Contact Section */}
      <div 
        className="mb-10 relative group"
        onMouseEnter={() => setHoveredSection('contact')}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contact</h2>
          {hoveredSection === 'contact' && (
            <button className="text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Edit All
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {/* Email */}
          <div className="flex items-start relative group/contact">
            <i className="fas fa-envelope text-gray-400 mt-1 mr-3"></i>
            {editingContactField === 'email' ? (
              <div className="flex-1">
                <input
                  type="email"
                  value={tempContactValue}
                  onChange={(e) => setTempContactValue(e.target.value)}
                  className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-white"
                  autoFocus
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={saveContactEdit}
                    className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelContactEdit}
                    className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex-1">
                <span 
                  className="text-gray-300 cursor-pointer hover:bg-gray-700 p-2 -m-2 rounded block"
                  onClick={() => startEditingContact('email', contactInfo.email)}
                >
                  {contactInfo.email}
                </span>
                <button
                  onClick={() => startEditingContact('email', contactInfo.email)}
                  className="absolute top-0 right-0 text-xs bg-gray-700 text-white px-2 py-0.5 rounded opacity-0 group-hover/contact:opacity-100 transition-opacity"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          
          {/* Phone */}
          <div className="flex items-start relative group/contact">
            <i className="fas fa-phone text-gray-400 mt-1 mr-3"></i>
            {editingContactField === 'phone' ? (
              <div className="flex-1">
                <input
                  type="tel"
                  value={tempContactValue}
                  onChange={(e) => setTempContactValue(e.target.value)}
                  className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-white"
                  autoFocus
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={saveContactEdit}
                    className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelContactEdit}
                    className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex-1">
                <span 
                  className="text-gray-300 cursor-pointer hover:bg-gray-700 p-2 -m-2 rounded block"
                  onClick={() => startEditingContact('phone', contactInfo.phone)}
                >
                  {contactInfo.phone}
                </span>
                <button
                  onClick={() => startEditingContact('phone', contactInfo.phone)}
                  className="absolute top-0 right-0 text-xs bg-gray-700 text-white px-2 py-0.5 rounded opacity-0 group-hover/contact:opacity-100 transition-opacity"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          
          {/* Address */}
          <div className="flex items-start relative group/contact">
            <i className="fas fa-map-marker-alt text-gray-400 mt-1 mr-3"></i>
            {editingContactField === 'address' ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={tempContactValue}
                  onChange={(e) => setTempContactValue(e.target.value)}
                  className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-white"
                  autoFocus
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={saveContactEdit}
                    className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelContactEdit}
                    className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex-1">
                <span 
                  className="text-gray-300 cursor-pointer hover:bg-gray-700 p-2 -m-2 rounded block"
                  onClick={() => startEditingContact('address', contactInfo.address)}
                >
                  {contactInfo.address}
                </span>
                <button
                  onClick={() => startEditingContact('address', contactInfo.address)}
                  className="absolute top-0 right-0 text-xs bg-gray-700 text-white px-2 py-0.5 rounded opacity-0 group-hover/contact:opacity-100 transition-opacity"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div 
        className="mb-6 relative group"
        onMouseEnter={() => setHoveredSection('languages')}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Languages</h2>
          <div className="flex gap-2">
            {hoveredSection === 'languages' && (
              <button
                onClick={startAddingLanguage}
                className="text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Add Language
              </button>
            )}
          </div>
        </div>

        {/* Add/Edit Language Form */}
        {editingLanguage && (
          <div className="mb-4 p-3 bg-gray-700 rounded">
            <div className="space-y-2">
              <input
                type="text"
                value={editingLanguage.name}
                onChange={(e) => updateEditingLanguage('name', e.target.value)}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
                placeholder="Language name"
              />
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Level: {editingLanguage.level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingLanguage.level}
                  onChange={(e) => updateEditingLanguage('level', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={saveLanguage}
                className="text-xs bg-gray-800 text-white px-3 py-1 rounded"
              >
                {isAddingLanguage ? 'Add' : 'Save'}
              </button>
              <button
                onClick={cancelLanguageEdit}
                className="text-xs bg-gray-600 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              {!isAddingLanguage && (
                <button
                  onClick={() => deleteLanguage(editingLanguage.id)}
                  className="text-xs bg-red-700 text-white px-3 py-1 rounded ml-auto"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )}

        {/* Languages List */}
        <div className="space-y-4">
          {languages.map((language) => (
            <div 
              key={language.id} 
              className="relative group/language"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-300">{language.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">{language.level}%</span>
                  <button
                    onClick={() => startEditingLanguage(language)}
                    className="text-xs bg-gray-700 text-white px-2 py-0.5 rounded opacity-0 group-hover/language:opacity-100 transition-opacity"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500 rounded-full"
                  style={{ width: `${language.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for languages */}
        {languages.length === 0 && (
          <div className="text-center py-4 text-gray-400">
            <p>No languages added. Click "Add Language" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}