import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getTokenInSessionStorage } from "../../utils/sessionStorage";
import authService from "../../services/auth.service";
import { setTokenInAxios } from "../../utils/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  user: unknown; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: {},
  setIsAuthenticated: () => undefined,
  loading: true, // Default to loading
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    setTokenInAxios();
    if (getTokenInSessionStorage()) {
      authService
        .verifyToken()
        .then(() => {
          setIsAuthenticated(true);
          authService.getProfile().then((user) => setUser(user));
        })
        .catch(() => setIsAuthenticated(false))
        .finally(() => setLoading(false)); // Mark loading as complete
    } else {
      setLoading(false); // No token, no need to wait
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
