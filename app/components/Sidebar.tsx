// app/components/Sidebar.tsx
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
          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
            <span className="text-gray-300 text-4xl">JD</span>
          </div>
        </div>
      </div>
      
      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}