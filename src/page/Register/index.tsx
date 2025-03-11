import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { SetTokenInSessionStorage } from "../../utils/sessionStorage";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../component/LoadingSpinner";
import { FacebookLoginButton, GoogleLoginButton } from "../../component/OAuth";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  onChange,
}) => (
  <div className="mb-6">
    <input
      type={type}
      name={name}
      id={name}
      onChange={onChange}
      className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500"
      placeholder={placeholder}
    />
  </div>
);

const Register: React.FC = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setErrorMessage("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    try {
      const newUser = { ...data, profile: { name: data.name } };
      const res = await authService.register(newUser);
      SetTokenInSessionStorage(res.user["access_token"]);
      window.location.href = "/";
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorMessage(
        "فشل في التسجيل. يرجى التحقق من البيانات والمحاولة مرة أخرى."
      );
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex min-h-screen">
      {/* Register Form */}
      <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 bg-gray-100 shadow-lg p-8">
        <div className="text-center mb-6">
          <a className="text-3xl text-orange-500 font-bold">بيكسل</a>
        </div>
        <div className="space-y-2  my-2">
          <GoogleLoginButton />
          <FacebookLoginButton />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-md shadow-md"
        >
          <InputField
            type="text"
            name="name"
            placeholder="الاسم كامل"
            onChange={handleChangeInput}
          />
          <InputField
            type="text"
            name="username"
            placeholder="اسم المستخدم"
            onChange={handleChangeInput}
          />
          <InputField
            type="email"
            name="email"
            placeholder="البريد الالكترونى"
            onChange={handleChangeInput}
          />
          <InputField
            type="password"
            name="password"
            placeholder="كلمة المرور"
            onChange={handleChangeInput}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="تـاكيد كلمة المرور"
            onChange={handleChangeInput}
          />
          <div className="form-check text-start my-4">
            <input
              id="agree"
              required
              name="agree"
              type="checkbox"
              className="form-check-input"
            />
            <label htmlFor="agree" className="text-sm">
              {" "}
              أنا اوافق على{" "}
              <a href="#" className="text-orange-500">
                الشروط والسياسات
              </a>
              .
            </label>
          </div>

          {errorMessage && (
            <span className="bg-red-300 text-center rounded-lg py-2 px-1 text-sm block mb-4">
              {errorMessage}
            </span>
          )}

          <button
            className="bg-orange-500 text-white py-4 px-8 rounded-md w-full"
            type="submit"
          >
            أنشاء حساب
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          لديك حساب بالفعل ؟{" "}
          <Link to="/login" className="text-orange-500">
            تسجيل الدخول
          </Link>
        </p>
      </div>
      <div
        className="hidden md:block md:w-1/2 lg:w-2/3 bg-cover bg-center"
        style={{ backgroundImage: "url('src/assets/login-bg.jpg')" }}
      ></div>
    </div>
  );
};

export default Register;
