/* --- File: src/pages/recipe/[id].tsx --- */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FavoriteButton from '../../components/FavoriteButton';
import Layout from '../../components/Layout';

export default function RecipeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setRecipe(data.meals?.[0]);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div className="p-6 text-center text-gray-600">Loading recipe...</div>;

  return (
    <Layout>
      <main
        className="min-h-screen py-10 px-6 bg-[#3E2723] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#5D4037] via-[#6D4C41] to-[#3E2723] bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
          <div className="md:w-1/2 flex items-start justify-center bg-gradient-to-br from-[#5D4037] via-[#6D4C41] to-[#3E2723] bg-opacity-90 backdrop-blur-md py-6">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="object-cover w-[360px] h-[280px] rounded-2xl shadow-md"
            />
          </div>
          <div className="md:w-1/2 p-8 space-y-6">
            <h1 className="text-3xl font-extrabold text-yellow-100">{recipe.strMeal}</h1>

            <FavoriteButton
              recipeId={recipe.idMeal}
              recipeName={recipe.strMeal}
              imageUrl={recipe.strMealThumb}
            />

            <div>
              <h2 className="text-lg font-bold text-yellow-200 mb-2">🥦 Ingredients</h2>
              <ul className="list-disc list-inside text-sm text-yellow-100 space-y-1">
                {Array.from({ length: 20 }, (_, i) => {
                  const ing = recipe[`strIngredient${i + 1}`];
                  const measure = recipe[`strMeasure${i + 1}`];
                  return ing && ing.trim() ? (
                    <li key={i}>{ing} - {measure}</li>
                  ) : null;
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-yellow-200 mb-2">📋 Instructions</h2>
              <p className="text-sm text-yellow-100 leading-relaxed whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
