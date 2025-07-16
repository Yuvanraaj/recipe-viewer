/* --- File: src/pages/index.tsx --- */
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const fetchRecipes = async (term: string) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  useEffect(() => {
    fetchRecipes('');
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchRecipes(term);
  };

  const handleSurprise = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    const randomId = data.meals?.[0]?.idMeal;
    if (randomId) {
      router.push(`/recipe/${randomId}`);
    }
  };

  return (
    <Layout>
      <main
        className="min-h-screen py-10 px-4 bg-[#3E2723] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="max-w-2xl mx-auto mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a recipe..."
            className="w-full px-4 py-2 rounded-lg shadow text-sm bg-white/80 backdrop-blur placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="max-w-2xl mx-auto mb-10 text-center">
          <button
            onClick={handleSurprise}
            className="mt-2 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-md transition"
          >
            🎲 Surprise Me
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto animate-fade-in">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <p className="text-center col-span-full text-yellow-100">No recipes found.</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
