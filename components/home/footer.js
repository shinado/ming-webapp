import i18next from "i18next";
import Link from "next/link";

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
                <Link
                  href="https://twitter.com/ming_coin_eth"
                  className="text-blue-500 hover:text-blue-300"
                >
                  Twitter
                </Link>
              </p>
              {/* Add more info or links here */}
            </div>

            {/* Right Side: Links or Social Media Icons */}
            <div>
              <h3 className="text-lg font-semibold">{i18next.t("footer.links")}</h3>
              {/* Replace '#' with actual URLs */}
              <ul className="mt-2">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    {i18next.t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/burn" className="hover:text-gray-300">
                    {i18next.t("nav.burn")}
                  </Link>
                </li>
                <li>
                  <Link href="/deaderboard" className="hover:text-gray-300">
                    {i18next.t("nav.deaderboard")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-gray-300">
                    {i18next.t("nav.blog")}
                  </Link>
                </li>
                <li>
                  <Link href="/freemint" className="hover:text-gray-300">
                    {i18next.t("nav.mint")}
                  </Link>
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
