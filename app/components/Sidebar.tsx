import ProgressBar from './ProgressBar';

interface Language {
  name: string;
  level: number;
}

export default function Sidebar() {
  const languages: Language[] = [
    { name: 'English', level: 100 },
    { name: 'Urdu', level: 80 },
    { name: 'Spanish', level: 60 }
  ];

  return (
    <div className="col-span-12 md:col-span-4 bg-gray-800 text-white p-8 md:p-10">
      {/* Profile Image */}
      <div className="mb-8">
        <div className="w-40 h-40 md:w-full md:h-64 bg-gray-700 mx-auto md:mx-0 overflow-hidden rounded-lg">
          {/* Replace with Next/Image for production */}
          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
            <span className="text-gray-300 text-4xl">JD</span>
          </div>
        </div>
      </div>
      
      {/* Name & Role */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">John Doe</h1>
        <div className="w-12 h-0.5 bg-gray-600 mb-3"></div>
        <p className="text-gray-300 text-lg font-medium">SENIOR DESIGNER</p>
      </div>
      
      {/* Social Icons */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <i className="fab fa-dribbble text-xl"></i>
          </a>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <i className="fas fa-envelope text-gray-400 mt-1 mr-3"></i>
            <span className="text-gray-300">info@yourmail.com</span>
          </div>
          <div className="flex items-start">
            <i className="fas fa-phone text-gray-400 mt-1 mr-3"></i>
            <span className="text-gray-300">+0000 1234 5678</span>
          </div>
          <div className="flex items-start">
            <i className="fas fa-map-marker-alt text-gray-400 mt-1 mr-3"></i>
            <span className="text-gray-300">New York City - 000</span>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Languages</h2>
        <div className="space-y-4">
          {languages.map((language, index) => (
            <ProgressBar 
              key={index} 
              skill={language.name} 
              percentage={language.level} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}