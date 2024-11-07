import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return (
    <div>
      <p className="hidden text-sm font-semibold md:block">{username}</p>
    </div>
  );
}

export default UserName;
