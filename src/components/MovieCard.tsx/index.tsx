import { Link } from "react-router-dom";
import { image_url } from "../../constants";
import { useState } from "react";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}
const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster_path,
  release_date,
  overview,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <Link
      to={`/movie/${id}`}
      key={id}
      className="movie-card"
    >
      <img
        src={`${image_url}/t/p/w200${poster_path}`}
        alt={title}
        className="w-full"
      />
      <h3 className="h3 line-clamp-2 h-16 my-2">{title}</h3>
      <p className="text-sm text-gray-600 my-2">
        Release Date: - {new Date(release_date).toLocaleDateString()}
      </p>
      <p className={isExpanded ? "" : "line-clamp-3 body-lg"}>{overview}</p>
      <button onClick={toggleExpand} className="text-blue-500 text-sm mb-2">
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </Link>
  );
};
export default MovieCard;
