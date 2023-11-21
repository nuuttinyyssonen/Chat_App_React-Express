const SignupForm = ({ username, setUsername, password, setPassword, passwordRepeat, setPasswordRepeat, firstName, setFirstName, lastName, setLastName, email, setEmail, onSubmit  }) => {
  return(
    <form onSubmit={onSubmit}>
      <input placeholder="First name..." value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      <input placeholder="Last name..." value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      <input placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input placeholder="Repeat password..." value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;