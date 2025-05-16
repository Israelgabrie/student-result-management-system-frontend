import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const ErrorPage = () => {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Trigger mount animation
    setMounted(true)

    // Add floating animation to mountains
    const mountains = document.querySelectorAll(".mountain")
    mountains.forEach((mountain, index) => {
      mountain.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite alternate`
    })
  }, [])

  return (
    <div
      className="error-container"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="mountains-container">
        <div className="mountain mountain-1"></div>
        <div className="mountain mountain-2"></div>
        <div className="mountain mountain-3"></div>
      </div>

      <div className="error-content">
        <h1 className="error-title">404</h1>
        <div className="error-divider"></div>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="university-logo">
        <span>Mountain Top University</span>
        <span className="subtitle">Result Management System</span>
      </div>

      <style jsx>{`
        /* Error Page Styles */
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
          padding: 2rem;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: opacity 0.8s ease, transform 0.8s ease;
          position: relative;
          overflow: hidden;
        }

        .mountains-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          z-index: 1;
        }

        .mountain {
          position: absolute;
          bottom: 0;
          border-radius: 8px;
        }

        .mountain-1 {
          left: 10%;
          width: 25%;
          height: 60%;
          background: linear-gradient(135deg, #6f42c1 0%, #5e35b1 100%);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }

        .mountain-2 {
          left: 35%;
          width: 35%;
          height: 80%;
          background: linear-gradient(135deg, #5e35b1 0%, #4527a0 100%);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }

        .mountain-3 {
          right: 10%;
          width: 20%;
          height: 50%;
          background: linear-gradient(135deg, #4527a0 0%, #311b92 100%);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-10px);
          }
        }

        .error-content {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
          z-index: 2;
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-title {
          font-size: 8rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #6f42c1 0%, #4527a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .error-divider {
          height: 4px;
          width: 80px;
          background: linear-gradient(90deg, #6f42c1, #4527a0);
          margin: 1.5rem auto;
          border-radius: 2px;
        }

        .error-subtitle {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: #343a40;
        }

        .error-message {
          font-size: 1.1rem;
          color: #6c757d;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .back-button {
          background: linear-gradient(135deg, #6f42c1 0%, #4527a0 100%);
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(111, 66, 193, 0.3);
          position: relative;
          overflow: hidden;
        }

        .back-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(111, 66, 193, 0.4);
        }

        .back-button:active {
          transform: translateY(-1px);
        }

        .back-button::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%);
          transform-origin: 50% 50%;
        }

        .back-button:hover::after {
          animation: ripple 1s ease-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 0.5;
          }
          100% {
            transform: scale(20, 20);
            opacity: 0;
          }
        }

        .university-logo {
          position: absolute;
          bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          font-weight: 700;
          font-size: 1.2rem;
          color: #343a40;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          font-size: 0.9rem;
          font-weight: 400;
          color: #6c757d;
          margin-top: 0.3rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .error-content {
            padding: 2rem;
          }

          .error-title {
            font-size: 6rem;
          }

          .error-subtitle {
            font-size: 1.5rem;
          }

          .mountains-container {
            height: 20vh;
          }
        }

        @media (max-width: 480px) {
          .error-content {
            padding: 1.5rem;
          }

          .error-title {
            font-size: 4rem;
          }

          .error-subtitle {
            font-size: 1.2rem;
          }

          .error-message {
            font-size: 0.9rem;
          }

          .back-button {
            padding: 0.7rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default ErrorPage;
