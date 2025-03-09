import React, { useState } from "react";

const Modal = ({
  toggle,
  toggleStyle,
  header,
  body,
  accept,
  acceptStyle,
  decline,
}: {
  toggle: string;
  header: string;
  toggleStyle: string;
  body: string;
  acceptStyle: string;
  accept: () => void;
  decline: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* زر فتح المودال */}
      <button onClick={() => setIsOpen(true)} className={toggleStyle}>
        {toggle}
      </button>

      {/* المودال الرئيسي */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700 text-right">
            {/* رأس المودال */}
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {header}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">إغلاق النافذة</span>
              </button>
            </div>

            {/* محتوى المودال */}
            <div className="p-4 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {body}
              </p>
            </div>

            {/* تذييل المودال */}
            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => {
                  setIsOpen(false);
                  accept();
                }}
                className={acceptStyle}
              >
                أوافق
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  decline();
                }}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                أرفض
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
