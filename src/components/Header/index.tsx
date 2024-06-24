import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={"/"}>
      <h1 className="h1">{`Wookie Movies`}</h1>
    </Link>
  );
};
export default Header;
