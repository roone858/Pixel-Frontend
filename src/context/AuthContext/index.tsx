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
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  setIsLogin: () => undefined,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (getTokenInSessionStorage()) {
      authService
        .verifyToken()
        .then(() => setIsLogin(true))
        .catch(() => setIsLogin(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
