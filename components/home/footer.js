import i18next from "i18next";

export default function Footer() {
  return (
    <>
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            {/* Left Side: About or Contact Info */}
            <div>
              <h3 className="text-lg font-semibold">
                {i18next.t("footer.about")}
              </h3>
              <p className="mt-2">
                {i18next.t("footer.follow.us")}
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
              <h3 className="text-lg font-semibold">{i18next.t("footer.links")}</h3>
              {/* Replace '#' with actual URLs */}
              <ul className="mt-2">
                <li>
                  <a href="/" className="hover:text-gray-300">
                    {i18next.t("nav.home")}
                  </a>
                </li>
                <li>
                  <a href="/burn" className="hover:text-gray-300">
                    {i18next.t("nav.burn")}
                  </a>
                </li>
                <li>
                  <a href="/deaderboard" className="hover:text-gray-300">
                    {i18next.t("nav.deaderboard")}
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-gray-300">
                    {i18next.t("nav.blog")}
                  </a>
                </li>
                <li>
                  <a href="/freemint" className="hover:text-gray-300">
                    {i18next.t("nav.mint")}
                  </a>
                </li>
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
