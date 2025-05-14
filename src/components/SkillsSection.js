import React from 'react';

const skills = [
  { name: 'WordPress', level: 100 },
  { name: 'Woocommerce', level: 100 },
  { name: 'Elementor', level: 95 },
  { name: 'Divi', level: 95 },
  { name: 'WP-Bakery', level: 85 },
  { name: 'LearnDash', level: 90 },
  { name: 'Yoast SEO', level: 95 },
  { name: 'Shopify', level: 95 },
  { name: 'Prestashop', level: 85 },
  { name: 'Webflow', level: 90 },
  { name: 'Magento', level: 80 },
  { name: 'Drupal', level: 80 },
  { name: 'HTML5', level: 100 },
  { name: 'CSS3', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'ECMAScript', level: 90 },
  { name: 'PHP 8.1', level: 88 },
  { name: 'MySQL', level: 85 },
  { name: 'Bootstrap', level: 92 },
  { name: 'React.js', level: 80 },
  { name: 'Angular.js', level: 75 },
  { name: 'Vue.js', level: 85 },
  { name: 'Three.js', level: 70 },
  { name: 'Laravel', level: 70 },
  { name: 'Liferay', level: 79 },
  { name: 'Adobe Photoshop', level: 50 },
  { name: 'Adobe Illustrator', level: 50 },
  { name: 'Figma', level: 88 },
  { name: 'Google ADS', level: 75 },
  { name: 'Google Analytics', level: 82 },
  { name: 'Git', level: 90 },
  { name: 'Google Tag Manager', level: 78 },
  { name: 'SEO orgánico', level: 88 },
  { name: 'Gestión de Hosting', level: 85 },
  { name: 'Gestión de dominio', level: 90 }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mis <span className="text-blue-600">Habilidades</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino y disfruto utilizando.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">{skill.name}</span>
                <span className="text-blue-600 font-medium">{skill.level}%</span>
              </div>
              <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

// DONE