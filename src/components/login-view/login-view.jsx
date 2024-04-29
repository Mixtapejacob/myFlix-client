import { useState } from "react";
import { Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movie-api-ul5k.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
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