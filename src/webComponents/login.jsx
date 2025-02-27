import React, { useState } from 'react';
import "../css/login.css";
import { AccountIcon, EyeCloseIcon, EyeOpenIcon } from '../assets/svg';

export default function Login() {
  const [passwordInput, setPasswordInput] = useState({ value: "", visible: "" });

  return (
    <div className="studentLoginContainer">
      <div className="studentLoginBox">
        {/* Top Bar */}
        <div className="loginTopBar">
          <img className="loginImage" src="../../public/img/mtu logo.png" alt="MTU Logo" />
          <div className="studentLoginHead">Result Login</div>
        </div>

        {/* ID Number Input */}
        <div className="studentLoginItem">
          <div className="loginBtnBox">
            <AccountIcon color="black" />
          </div>
          <input
            className="studentLoginInput"
            type="text"
            placeholder="ID Number"
          />
        </div>

        {/* Password Input */}
        <div className="studentLoginItem">
          <div
            onClick={() => {
              setPasswordInput({
                value: passwordInput.value,
                visible: !passwordInput.visible,
              });
            }}
            className="loginBtnBox"
          >
            {passwordInput.visible ? <EyeOpenIcon /> : <EyeCloseIcon />}
          </div>
          <input
            className="studentLoginInput"
            type={passwordInput.visible ? "password" : "text"}
            placeholder="Password"
          />
        </div>

        {/* Remember Me */}
        <div className="rememberMeBox">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe" className="rememberMeText">
            Remember Me
          </label>
        </div>

        {/* Login Button */}
        <div className="studentLoginBtn">Login</div>
      </div>
    </div>
  );
}
