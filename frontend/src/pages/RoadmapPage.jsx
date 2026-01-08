import roadmapData from '../utils/roadmapData'
import CategoryCard from '../components/roadmap/CategoryCard'
import SkillNode from '../components/roadmap/SkillNode'
import ProgressBar from '../components/common/ProgressBar'

export default function RoadmapPage({ onSelectSkill }) {
  return (
    <>
      <ProgressBar />
      {roadmapData.categories.map((cat, i) => (
        <CategoryCard key={cat.id} category={cat} index={i}>
          {cat.skills.map(skill => (
            <SkillNode
              key={skill.id}
              skill={skill}
              onSelect={onSelectSkill}
            />
          ))}
        </CategoryCard>
      ))}
    </>
  )
}
