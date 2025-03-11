import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="py-4">
      <nav className="flex text-gray-600" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg
                className="w-5 h-5 ml-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z"
                  clipRule="evenodd"
                />
              </svg>
              الرئيسية
            </Link>
          </li>
          <li>
            <div className="flex items-center text-gray-500">
              <svg
                className="w-5 h-5 mx-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
              <Link to="/" className="text-blue-600 hover:underline">
                المستخدم
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center text-gray-500">
              <svg
                className="w-5 h-5 mx-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
              <span>الاعدادات</span>
            </div>
          </li>
        </ol>
      </nav>
      <h1 className="text-2xl font-bold mt-4">الاعدادات</h1>
    </div>
  );
};

export default Breadcrumb;
