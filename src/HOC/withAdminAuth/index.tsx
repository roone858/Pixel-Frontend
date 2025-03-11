import { useContext, useEffect, ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface User {
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const withAdminAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useContext(
      AuthContext
    ) as AuthContextType;

    useEffect(() => {
      if (!loading && user?.role !== "admin") navigate("/"); // Redirect if not an admin
    }, [user, navigate, loading, isAuthenticated]);

    return user?.role === "admin" ? <WrappedComponent {...props} /> : null;
  };
};

export default withAdminAuth;
