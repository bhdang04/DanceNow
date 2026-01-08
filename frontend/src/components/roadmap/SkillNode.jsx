import { Play, Check, Lock } from 'lucide-react'
import DifficultyBadge from '../common/DifficultyBadge'

export default function SkillNode({ skill, onSelect }) {
  return (
    <button
      disabled={skill.locked}
      onClick={() => onSelect(skill)}
      className="p-4 rounded-xl border"
    >
      <h3>{skill.title}</h3>
      <DifficultyBadge difficulty={skill.difficulty} />
    </button>
  )
}
