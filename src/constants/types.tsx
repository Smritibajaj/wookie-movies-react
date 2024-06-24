export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster: string;
  backdrop: string;
  classification: string;
  length: string;
  released_on: string;
  genres: string[];
  cast?: string[];
  imdb_rating?: string | number;
  slug?: string;
  director?: string;
}

export interface GenreSectionProps {
  name: string;
  genre: Movie[];
}
