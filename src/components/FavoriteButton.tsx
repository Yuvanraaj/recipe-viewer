import { useState } from 'react';

interface FavoriteButtonProps {
  recipeId: string;
  recipeName: string;
  imageUrl: string;
}

export default function FavoriteButton({ recipeId, recipeName, imageUrl }: FavoriteButtonProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId, recipeName, imageUrl }),
      });
      if (res.ok) setSaved(true);
    } catch (err) {
      console.error('Error saving favorite:', err);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saved}
      className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition duration-300 shadow-md ${
        saved
          ? 'bg-green-600 text-white cursor-not-allowed'
          : 'bg-yellow-400 hover:bg-yellow-500 text-black'
      }`}
    >
      {saved ? 'Saved to Favorites ❤️' : 'Save to Favorites 🤍'}
    </button>
  );
}
