import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";
import ToggleTheme from "../components/ToggleTheme";
import { FiGlobe } from "react-icons/fi";


function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function onRegisterHandler(user) {
    console.log("onRegisterHandler called with:", user);
    if (user.password !== user.confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok");
      return;
    }
    console.log("register function is:", register);
    const { error } = await register({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    if (!error) {
      navigate("/login");
    } else {
      setErrorMessage("Registrasi gagal. Mungkin email sudah digunakan.");
    }
  }
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <div>
            <header>
              <h2>{locale === 'id' ? "Daftar Akun" : "Register Your Account"}</h2>
              <div className="header-buttons">
              <button onClick={toggleLocale}>
                <FiGlobe/>
              </button>
              <ToggleTheme />
            </div>
            </header>
            <RegisterInput register={onRegisterHandler} />
            <p>
              {locale === 'id' ? "Kembali ke " : "Go to "} <Link to="/login">{locale === 'id' ? "Masuk" : "Login"}</Link>
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
