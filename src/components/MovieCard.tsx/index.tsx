import { Link } from "react-router-dom";
import { image_url } from "../../constants";

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
  return (
    <Link
      to={`/movie/${id}`}
      key={id}
      style={{ width: "200px", textDecoration: "none", color: "inherit" }}
    >
      <img
        src={`${image_url}/t/p/w200${poster_path}`}
        alt={title}
        style={{ width: "100%" }}
      />
      <h3>{title}</h3>
      <p>{new Date(release_date).toLocaleDateString()}</p>
      <p>{overview}</p>
    </Link>
  );
};
export default MovieCard;
