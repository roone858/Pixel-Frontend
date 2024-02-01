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

interface AuthContextType {
  isLogin: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  user: {},
  setIsLogin: () => undefined,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (getTokenInSessionStorage()) {
      authService
        .verifyToken()
        .then(() => {
          setIsLogin(true);
          authService.getProfile().then((user) => setUser(user));
        })
        .catch(() => setIsLogin(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, user, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
