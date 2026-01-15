import { useState, useEffect } from 'react';
import SkillPage from '../components/skill/SkillPage';

const SkillDetail = ({ skillId, onBack }) => {
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/skills/${skillId}`);
        const data = await res.json();
        setSkill(data);
      } catch (err) {
        console.error('Failed to fetch skill', err);
      }
    };

    if (skillId) fetchSkill();
  }, [skillId]);

  if (!skill) return <p>Loading...</p>;

  return <SkillPage skill={skill} onBack={onBack} />;
};

export default SkillDetail;
