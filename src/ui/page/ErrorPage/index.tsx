import {Link, useNavigate} from "react-router-dom";
import './errorStyle.css'
import {useEffect, useState} from "react";

export default function ErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount:number) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-title">OOPs</div>
        <div className="error-subtitle">Something went wrong...</div>
        <div className="error-description">
          You will be redirected to Homepage after {countdown} second, <br/>or you may click the button below.
        </div>
        <Link to="/" className="error-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

