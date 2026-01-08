import DifficultyBadge from '../common/DifficultyBadge'

export default function CategoryCard({ category, index }) {
  return (
    <div className="bg-white rounded-2xl p-6 border">
      <div className={`w-16 h-16 bg-gradient-to-r ${category.color}`}>
        {index + 1}
      </div>
      <h2>{category.title}</h2>
      <DifficultyBadge difficulty={category.difficulty} />
    </div>
  )
}
