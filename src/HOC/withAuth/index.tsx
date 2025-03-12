import { ComponentType, FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingPage from "../../page/LoadingPage";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const AuthWrapper: FC<P> = (props) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, loading, navigate]);

    if (loading) return <LoadingPage />; 
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
