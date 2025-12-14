// app/components/ExperienceSection.js
export default function ExperienceSection() {
  const experiences = [
    {
      title: 'Senior Designer',
      period: '2000 - 2000',
      company: 'Company Name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Senior Designer',
      period: '2000 - 2000',
      company: 'Company Name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Senior Designer',
      period: '2000 - 2000',
      company: 'Company Name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Experience</h2>
      <div className="w-12 h-0.5 bg-gray-300 mb-6"></div>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <h3 className="font-bold text-gray-900">{exp.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{exp.period}</p>
              <p className="text-gray-700 font-medium mt-2">{exp.company}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-gray-600 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}