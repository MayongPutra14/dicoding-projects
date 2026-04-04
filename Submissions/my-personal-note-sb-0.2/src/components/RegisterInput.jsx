import PropTypes from "prop-types";
import { useState } from "react";
import { register } from "../utils/api";

export default function RegisterInput({ register }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNameChange = (event) => setName(event.target.value);
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);
  const onConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Form submitted, data:', { name, email, password, confirmPassword });
    register({
      name,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">Nama</label>
      <input
      type="text" 
      id="name"
      placeholder="Felicia Putri"
      value={name}
      onChange={onNameChange}
      />
      <label htmlFor="email">Email</label>
      <input
      type="email" 
      id="email"
      placeholder="Feliciaptr@email.com"
      value={email}
      onChange={onEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
      type="password" 
      id="password"
      placeholder="Eli1412004"
      value={password}
      onChange={onPasswordChange}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
      type="password" 
      id="nama"
      placeholder="Ketik ulang password"
      value={confirmPassword}
      onChange={onConfirmPasswordChange}
      />

      <button>Register</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
}
