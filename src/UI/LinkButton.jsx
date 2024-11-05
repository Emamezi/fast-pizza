import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const CLASS_NAME =
    "text-sm text-blue-500 hover:text-blue-600 hover:underline";
  if (to === "-1")
    return (
      <button className={CLASS_NAME} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={CLASS_NAME}>
      {children}
    </Link>
  );
}

export default LinkButton;
