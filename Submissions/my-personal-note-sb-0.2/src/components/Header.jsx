import React from "react";
import PropTypes from "prop-types";
import ToggleTheme from "./ToggleTheme";
import { LocaleConsumer } from "../contexts/LocaleContext";
import { FiGlobe, FiLogOut } from "react-icons/fi";

export default function Header({ user, onLogout }) {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <header>
            <h1>{locale === "id" ? "Catatan Pribadi" : "Personal Note"}</h1>
            <span>Hello, {user.name}</span>
            <div className="header-buttons">
              <button onClick={toggleLocale}>
                <FiGlobe/>
              </button>
              <ToggleTheme />
            </div>
            {user && (
              <div className="user-info">
                <button onClick={onLogout} className="logout-button">
                  <FiLogOut/> 
                </button>
              </div>
            )}
          </header>
        );
      }}
    </LocaleConsumer>
  );
}
Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};
