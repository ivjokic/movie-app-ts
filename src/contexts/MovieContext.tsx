import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from "react";

import { Movie } from "../pages/Home";

type MovieContextType = {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("Greska");
  }
  return context;
};

export const MovieProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      return JSON.parse(storedFavs);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(movie: Movie) {
    setFavorites((currentFavs) => [...currentFavs, movie]);
  }

  function removeFromFavorites(movieId: number) {
    setFavorites((currentFavs) =>
      currentFavs.filter((el) => el.id !== movieId)
    );
  }

  function isFavorite(movieId: number) {
    return favorites.some((el) => el.id === movieId);
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
