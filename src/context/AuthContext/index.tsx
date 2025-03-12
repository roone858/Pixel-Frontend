import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getTokenInSessionStorage } from "../../utils/sessionStorage";
import authService from "../../services/auth.service";
import { setTokenInAxios } from "../../utils/axios";
import { UserType } from "../../types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  updateUser: Dispatch<SetStateAction<UserType>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: {
    googleId: "",
    email: "",
    profile: {
      name: "",
      photo: "",
    },
    username: "",
  },
  setIsAuthenticated: () => undefined,
  updateUser: () => undefined,
  loading: true, // Default to loading
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType>({
    googleId: "",
    email: "",
    profile: {
      name: "",
      photo: "",
    },
    username: "",
  });
  const [loading, setLoading] = useState(true);

  const verifyAndFetchUser = useCallback(async () => {
    try {
      await authService.verifyToken();
      setIsAuthenticated(true);
      const userProfile = await authService.getProfile();
      setUser(userProfile);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);
  const updateUser = (user: UserType) => {
    setUser(user);
  };
  useEffect(() => {
    setTokenInAxios();
    if (getTokenInSessionStorage()) {
      verifyAndFetchUser();
    } else {
      setLoading(false); // No token, no need to wait
    }
  }, [verifyAndFetchUser]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
