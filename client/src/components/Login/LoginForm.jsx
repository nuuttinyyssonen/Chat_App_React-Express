const LoginForm = ({ username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
