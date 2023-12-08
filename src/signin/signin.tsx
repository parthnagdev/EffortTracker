import React, { useState } from 'react';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform sign-up logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'red', fontSize: '50px', marginTop: '1px' }}>Effort Tracker</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} >
          <h2 style={{ fontSize: '24px' }}>Sign Up</h2>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} style={{ fontSize: '18px' }} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} style={{ fontSize: '18px' }} />
          </label>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="button-style" style={{ width: '150px', height: '50px', margin: '10px', border: '1px solid black', borderRadius: '5px' }}>Sign Up</button>
            <button className="button-style2" onClick={() => { setUsername(''); setPassword(''); }} style={{ width: '150px', height: '50px', margin: '10px', border: '1px solid black', borderRadius: '5px' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;