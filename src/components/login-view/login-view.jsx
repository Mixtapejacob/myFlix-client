import { useState } from "react";
import { Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
  };

    fetch("https://movie-api-ul5k.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
    <label for="Username">Username</label>
    <input type="text" onChange={(e) => setUsername(e.target.value)} class="form-control" aria-describedby="username" placeholder="Enter username" />
  </div>
  <div class="form-group">
    <label for="Password">Password</label>
    <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" aria-describedby="password" placeholder="Enter password" />
  </div>
      <Button type="submit">
        Submit
      </Button>
    </form>
  );
};
