const getLogoUrl = (skill: string) => {
  const s = skill.toLowerCase();

  if (s.includes('github')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg';
  if (s.includes('git')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg';
  if (s.includes('react')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg';
  if (s.includes('node')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg';
  if (s.includes('php')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg';
  if (s.includes('mongo')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg';
  if (s.includes('sql')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg';
  if (s.includes('python')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg';
  if (s.includes('html')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg';
  if (s.includes('css')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg';
  if (s.includes('js') || s.includes('javascript') || s.includes('express')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg';

  return '';
};

const SkillsMarquee = () => {
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React',
    'Node.js', 'Express', 'MongoDB', 'MySQL',
    'PHP', 'Python', 'Git', 'GitHub'
  ];

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="flex gap-10">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            <img
              src={getLogoUrl(skill)}
              alt={skill}
              className="h-8 w-8"
            />
            <span className="whitespace-nowrap text-paper-400">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsMarquee;