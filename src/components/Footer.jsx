const Footer = () => {
  return (
    <footer className="bg-white text-black py-3 mt-8 shadow-lg shadow-true-black" >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Left Section */}
          <div className="flex flex-col items-center md:items-start">
            <h6 className="text-2xl font-semibold text-[#231f20] mb-3">To-Do List</h6>
            <p className="text-sm text-black mb-2">Made with <span className="text-red-500">❤️</span> by Monika Dalawat</p>
            <p className="text-sm text-[#231f20]">© 2024 To-Do List. All rights reserved.</p>
          </div>

          {/* Right Section with Features and Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
            {/* Features Section */}
            <div className="text-center md:text-left">
              <h6 className="text-lg font-semibold text-[#231f20] mb-2">Features</h6>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-black">Task Management</span>
                </li>
                <li>
                  <span className="text-sm text-black">Real-time Task Updates</span>
                </li>
                <li>
                  <span className="text-sm text-black">Task Priority and Due Dates</span>
                </li>
              </ul>
            </div>

            {/* Useful Links Section */}
            <div className="text-center md:text-left">
              <h6 className="text-lg font-semibold text-[#231f20] mb-2">Useful Links</h6>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-black hover:text-[#231f20] transition duration-300">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-black hover:text-[#231f20] transition duration-300">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-black hover:text-[#231f20] transition duration-300">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Divider Line */}
        <div className="w-full border-t border-[#231f20] my-6"></div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="flex items-center justify-center w-10 h-10 bg-[#231f20] text-white rounded-full hover:bg-[#68e1fd] hover:text-black transition duration-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://github.com/Monika-1082005/ToDo" className="flex items-center justify-center w-10 h-10 bg-[#231f20] text-white rounded-full hover:bg-[#68e1fd] hover:text-black transition duration-300">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="flex items-center justify-center w-10 h-10 bg-[#231f20] text-white rounded-full hover:bg-[#68e1fd] hover:text-black transition duration-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="flex items-center justify-center w-10 h-10 bg-[#231f20] text-white rounded-full hover:bg-[#68e1fd] hover:text-black transition duration-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
