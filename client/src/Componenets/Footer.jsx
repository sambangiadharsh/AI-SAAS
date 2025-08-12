import React from 'react'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-gray-50 text-gray-600">
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-gray-300 pb-10">

        {/* Logo and description */}
        <div className="md:max-w-md">
          <img
            className="h-10"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
            alt="dummy logo"
          />
          <p className="mt-6 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            It has been the industry's standard dummy text since the 1500s.
          </p>
        </div>

        {/* Navigation & newsletter */}
        <div className="flex-1 flex flex-col sm:flex-row justify-start md:justify-end gap-16">

          {/* Navigation Links */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-5 text-base">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="max-w-md">
            <h2 className="font-semibold text-gray-800 mb-5 text-base">Subscribe to our newsletter</h2>
            <p className="text-sm mb-4">
              The latest news, articles, and resources sent weekly to your inbox.
            </p>
            <form className="flex items-center gap-2 w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow h-10 rounded-md px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-xs md:text-sm pt-6 pb-6 text-gray-500">
        &copy; 2024 <a href="https://prebuiltui.com" className="underline hover:text-blue-600">PrebuiltUI</a>. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
