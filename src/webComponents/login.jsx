import React, { useState } from "react";
import "../css/login.css";
import { AccountIcon, EyeCloseIcon, EyeOpenIcon } from "../assets/svg";
import { getUser } from "../backendOperation";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../userContext"; // Import the useUser hook

export default function Login() {
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    visible: false,
  });
  const [idNumberInput, setIdNumberInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Access the setUser function from the context
  const { setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await getUser({
        idNumber: idNumberInput,
        password: passwordInput.value,
        rememberMe: rememberMe,
      });

      console.log(data);

      if (data.success) {
        // // Update the user context with the logged-in user data
        // setUser(data.user);

        setTimeout(() => {
          if (data.user.accountType === "student") {
            navigate("/homePage/dashBoard", { state: { user: data.user } });
          } else if (data.user.accountType === "admin") {
            navigate("/admin", { state: { user: data.user } });
          } else if (data.user.accountType === "superAdmin") {
            navigate("/superAdmin", { state: { user: data.user } });
          }
        }, 1000);
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
              setPasswordInput({
                ...passwordInput,
                visible: !passwordInput.visible,
              })
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

        <div className="rememberMeBox">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="rememberMeText">
            Remember Me
          </label>
        </div>

        <button type="submit" className="studentLoginBtn" disabled={loading}>
          {loading ? <PulseLoader color="white" size={10} /> : "Login"}
        </button>
      </form>
    </div>
  );
}
