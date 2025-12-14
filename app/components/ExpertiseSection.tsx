// app/components/ExpertiseSection.js
import ProgressBar from './ProgressBar';

export default function ExpertiseSection() {
  const skills = [
    { skill: 'Premiere Pro', percentage: 90 },
    { skill: 'Photoshop', percentage: 95 },
    { skill: 'After Effect', percentage: 85 },
    { skill: 'Illustrator', percentage: 88 }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Expertise</h2>
      <div className="w-12 h-0.5 bg-gray-300 mb-6"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {skills.slice(0, 2).map((skill, index) => (
            <ProgressBar 
              key={index} 
              skill={skill.skill} 
              percentage={skill.percentage} 
            />
          ))}
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {skills.slice(2, 4).map((skill, index) => (
            <ProgressBar 
              key={index + 2} 
              skill={skill.skill} 
              percentage={skill.percentage} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}