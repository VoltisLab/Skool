import { Globe } from "lucide-react"

interface Category {
  id: string
  label: string
  emoji: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export default function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === category.id
              ? 'bg-gray-900 hover:bg-gray-800 text-white'
              : 'border border-gray-300 hover:bg-gray-50 text-gray-700 bg-white'
          }`}
        >
          {category.emoji && `${category.emoji} `}{category.label}
        </button>
      ))}
      <button className="rounded-full border border-gray-300 hover:bg-gray-50 bg-white text-gray-700 px-4 py-2 text-sm font-medium">
        More... <Globe className="h-4 w-4 ml-1 inline" />
      </button>
    </div>
  )
} 