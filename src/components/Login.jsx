import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { login, setScreenMode } from "../features/hospitality/hospitalitySlice";
import Button from "react-bootstrap/Button";
import { validate } from "../validation/joi";
import { logIn } from "../validation/schemas";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await validate("logIn", {
      email: email,
      password: password,
    });
    console.log(result);

    if (email.length == 0 || password.length == 0) {
      setError(true);
    }

    if (email && password) {
      console.log("email:", email, "password:", password);
    }

    if (error === true) {
      dispatch(login(password));
      dispatch(setScreenMode(3));
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="50"
          height="50">
          <path d="M2.743 4.757a3.757 3.757 0 1 1 5.851 3.119 5.991 5.991 0 0 1 2.15 1.383c.17.17.257.405.258.646.003.598.001 1.197 0 1.795L11 12.778v.721a.5.5 0 0 1-.5.5H1.221a.749.749 0 0 1-.714-.784 6.004 6.004 0 0 1 3.899-5.339 3.754 3.754 0 0 1-1.663-3.119Z"></path>
          <path d="M15.75 6.875c0 .874-.448 1.643-1.127 2.09a.265.265 0 0 0-.123.22v.59c0 .067-.026.13-.073.177l-.356.356a.125.125 0 0 0 0 .177l.356.356c.047.047.073.11.073.176v.231c0 .067-.026.13-.073.177l-.356.356a.125.125 0 0 0 0 .177l.356.356c.047.047.073.11.073.177v.287a.247.247 0 0 1-.065.168l-.8.88a.52.52 0 0 1-.77 0l-.8-.88a.247.247 0 0 1-.065-.168V9.185a.264.264 0 0 0-.123-.22 2.5 2.5 0 1 1 3.873-2.09ZM14 6.5a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
        </svg>

        <input
          type="email"
          placeholder="enter email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        {error && email.length <= 0 ? <p>Email can't be empty</p> : ""}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
        {error && password.length <= 0 ? <p>Password can't be empty</p> : ""}

        <button type="submit" class="submit__btn">
          Log in
        </button>
      </form>
    </div>
  );
};
// dsavadvads

export default Loginpage;
