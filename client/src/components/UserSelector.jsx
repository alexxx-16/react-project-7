const UserSelector = ({
  users,
  currentUserId,
  setCurrentUserId,
  onAddUser,
}) => {
  return (
    <select
      value={currentUserId}
      onChange={(e) => {
        if (e.target.value === "ADD_NEW") {
          onAddUser();
        } else {
          setCurrentUserId(e.target.value);
        }
      }}
      className="bg-white/15 dark:bg-zinc-800/40 
    text-lg text-center px-2 rounded-md 
    ring ring-white/30 dark:ring-zinc-700
    outline-none cursor-pointer
    hover:bg-white/25 transition-all duration-200
    appearance-none"
    >
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
      <option value="ADD_NEW">Add User</option>
    </select>
  );
};

export default UserSelector;
