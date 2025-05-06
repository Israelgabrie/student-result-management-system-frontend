import React, { useState } from "react";
import "../css/login.css";
import { AccountIcon, EyeCloseIcon, EyeOpenIcon } from "../assets/svg";
import { getUser } from "../backendOperation";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../userContext";

export default function Login() {
  const [passwordInput, setPasswordInput] = useState({ value: "", visible: false });
  const [idNumberInput, setIdNumberInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await getUser({
        idNumber: idNumberInput,
        password: passwordInput.value,
        rememberMe: rememberMe,
      });

      if (data.success) {
        setUser(data.user);
        if (data.user.accountType === "student") {
          navigate("/homePage/dashBoard", { state: { user: data.user } });
        } else if (data.user.accountType === "admin") {
          navigate("/admin/myCourses", { state: { user: data.user } });
        } else if (data.user.accountType === "superAdmin") {
          navigate("/superAdmin", { state: { user: data.user } });
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="studentLoginContainer">
      <ToastContainer />
      <form className="studentLoginBox" onSubmit={handleSubmit}>
        <div className="loginTopBar">
          <img className="loginImage" src="/img/mtu logo.png" alt="MTU Logo" />
          <div className="studentLoginHead">Result Login</div>
        </div>

        <div className="studentLoginItem">
          <div className="loginBtnBox">
            <AccountIcon color="black" />
          </div>
          <input
            className="studentLoginInput"
            type="text"
            placeholder="ID Number"
            value={idNumberInput}
            onChange={(e) => setIdNumberInput(e.target.value)}
          />
        </div>

        <div className="studentLoginItem">
          <div
            onClick={() =>
              setPasswordInput({ ...passwordInput, visible: !passwordInput.visible })
            }
            className="loginBtnBox"
          >
            {passwordInput.visible ? <EyeOpenIcon /> : <EyeCloseIcon />}
          </div>
          <input
            className="studentLoginInput"
            type={passwordInput.visible ? "text" : "password"}
            placeholder="Password"
            value={passwordInput.value}
            onChange={(e) =>
              setPasswordInput({ ...passwordInput, value: e.target.value })
            }
          />
        </div>

        <div className="loginOptionsRow">
          <label className="rememberMeBox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="rememberMeText">Remember Me</span>
          </label>
          <button
            type="button"
            className="forgotPasswordLink"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="studentLoginBtn" disabled={loading}>
          {loading ? <PulseLoader color="white" size={10} /> : "Login"}
        </button>

        <div className="signupPrompt">
          Don't have an account?
          <button type="button" className="signupLink" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
