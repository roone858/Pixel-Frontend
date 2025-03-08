

const Footer = () => {
  return (
    <footer className="bg- py-10 border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
        {/* معلومات الشركة */}
        <div>
          <h3 className="text-xl font-semibold mb-4">الشركة</h3>
          <p className="text-sm text-gray-400">
            نقدم خدمات عالية الجودة مع أفضل تجربة للمستخدم.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="text-xl font-semibold mb-4">روابط سريعة</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-orange-600">الرئيسية</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-600">من نحن</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-600">الخدمات</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-600">اتصل بنا</a></li>
          </ul>
        </div>

        {/* الدعم */}
        <div>
          <h3 className="text-xl font-semibold mb-4">الدعم</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-orange-600">مركز المساعدة</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-600">الأسئلة الشائعة</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-600">سياسة الخصوصية</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-600">شروط الخدمة</a></li>
          </ul>
        </div>

        {/* وسائل التواصل الاجتماعي */}
        <div>
          <h3 className="text-xl font-semibold mb-4">تابعنا</h3>
          <div className="flex space-x-4 justify-end">
            {/* <a href="#" className="text-gray-400 hover:text-orange-600 text-2xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-orange-600 text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-orange-600 text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-orange-600 text-2xl"><FaLinkedin /></a> */}
          </div>
        </div>
      </div>

      {/* حقوق النشر */}
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لشركتك.
      </div>
    </footer>
  );
};

export default Footer;
