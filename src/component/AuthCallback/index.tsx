import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  const token = new URL(window.location.href).searchParams.get("token");
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("access_token", token);

      return navigate("/");
    } else {
      navigate("/login?error=missing_token");
    }
  }, [navigate, token]);

  return <h2>Authenticating...</h2>;
};

export default AuthCallback;
