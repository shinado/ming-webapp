export default function Footer() {
  return (
    <>
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            {/* Left Side: About or Contact Info */}
            <div>
              <h3 className="text-lg font-semibold">About $MING</h3>
              <p className="mt-2">
                A decentralized currency used in afterlife. Follow us on{" "}
                <a
                  href="https://twitter.com/ming_coin_eth"
                  className="text-blue-500 hover:text-blue-300"
                >
                  Twitter
                </a>
              </p>
              {/* Add more info or links here */}
            </div>

            {/* Right Side: Links or Social Media Icons */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              {/* Replace '#' with actual URLs */}
              <ul className="mt-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Roadmap
                  </a>
                </li>
                {/* More links */}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8">
            <p>&copy; {new Date().getFullYear()} $MING. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
