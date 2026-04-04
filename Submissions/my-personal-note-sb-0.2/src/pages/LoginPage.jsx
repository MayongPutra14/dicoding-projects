import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";
import ToggleTheme from "../components/ToggleTheme";
import { FiGlobe } from "react-icons/fi";

function LoginPage({ loginSuccess }) {
  const navigate = useNavigate();
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data.accessToken);
      navigate("/");
    }
  }

  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <div className="inpu">
            <header>
              <h2>{locale === 'id' ? "Halaman Login" : "Login Page"}</h2>
              <div className="header-buttons">
              <button onClick={toggleLocale}>
                <FiGlobe/>
              </button>
              <ToggleTheme />
            </div>
            </header>
            <LoginInput login={onLogin} />
            <p>
              {locale === 'id' ? "Belum punya akun?" : "Don't have account?"} <Link to="/register">{locale === 'id' ? "Daftar dinisi" : "Register here"}</Link>
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
