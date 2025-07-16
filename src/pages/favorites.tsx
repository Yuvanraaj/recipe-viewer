/* --- File: src/pages/favorites.tsx --- */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

interface Favorite {
  _id: string;
  recipeId: string;
  recipeName: string;
  imageUrl: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const fetchFavorites = async () => {
    const res = await fetch('/api/favorites');
    const data = await res.json();
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/favorites/${id}`, { method: 'DELETE' });
      setFavorites((prev) => prev.filter((f) => f._id !== id));
    } catch (error) {
      console.error('Failed to delete favorite:', error);
    }
  };

  return (
    <Layout>
      <main className="min-h-screen py-10 px-6 bg-[#3E2723] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
        <h1 className="text-4xl font-extrabold text-center mb-10 text-yellow-100 animate-fade-in">
          ❤️ My Favorite Recipes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto animate-fade-in">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <div key={fav._id} className="relative bg-white/80 backdrop-blur rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
                <Link href={`/recipe/${fav.recipeId}`} legacyBehavior>
                  <a>
                    <img src={fav.imageUrl} alt={fav.recipeName} className="w-full h-48 object-cover" />
                    <div className="p-4 text-center">
                      <h2 className="text-lg font-bold text-gray-800 truncate">{fav.recipeName}</h2>
                    </div>
                  </a>
                </Link>
                <button
                  onClick={() => handleDelete(fav._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 shadow"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-yellow-100">No favorites yet. Save some recipes first!</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
