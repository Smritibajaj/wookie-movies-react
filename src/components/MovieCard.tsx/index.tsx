import { Link } from "react-router-dom";
import { useState } from "react";
import { Movie } from "../../constants/types";

const MovieCard: React.FC<Movie> = ({
  id,
  title,
  backdrop,
  released_on,
  overview,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <Link to={`/movie/${id}`} key={id} className="movie-card">
      <img src={`${backdrop}`} alt={title} className="w-full" />
      <h3 className="h3 line-clamp-2 h-16 my-2">{title}</h3>
      <p className="text-sm text-gray-600 my-2">
        Release Date: - {new Date(released_on).toLocaleDateString()}
      </p>
      <p className={isExpanded ? "" : "line-clamp-3 body-lg"}>{overview}</p>
      <button onClick={toggleExpand} className="text-blue-500 text-sm mb-2">
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </Link>
  );
};
export default MovieCard;
