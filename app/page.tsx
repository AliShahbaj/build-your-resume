// app/page.js
import Sidebar from './components/Sidebar';
import ProfileSection from './components/ProfileSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ExpertiseSection from './components/ExpertiseSection';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto my-10">
      {/* Main Container */}
      <div className="grid grid-cols-12 bg-white shadow-lg">
        <Sidebar />
        
        {/* Right Main Content */}
        <div className="col-span-12 md:col-span-8 bg-white p-8 md:p-12">
          <ProfileSection />
          <ExperienceSection />
          <EducationSection />
          <ExpertiseSection />
        </div>
      </div>
    </div>
  );
}