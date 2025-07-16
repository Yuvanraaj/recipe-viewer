import Link from 'next/link';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.idMeal}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition duration-300 cursor-pointer">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-[180px] object-cover"
        />
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-gray-800 truncate">{recipe.strMeal}</h2>
        </div>
      </div>
    </Link>
  );
}
