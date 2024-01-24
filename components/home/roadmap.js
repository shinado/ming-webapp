import i18next from "../../app/i18n";

export default function Roadmap() {
  return (
    <>
      <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl font-extrabold text-white mb-20">
          {i18next.t("home.roadmap.title")}
        </h2>

        <ol class="items-center sm:flex">
          <li class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
              <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg
                  class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pe-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {i18next.t("home.roadmap.p1.title")}
              </h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                January 20, 2024
              </time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                {i18next.t("home.roadmap.p1.sub")}
              </p>
            </div>
          </li>
          <li class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
              <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg
                  class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pe-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {i18next.t("home.roadmap.p2.title")}
              </h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Feburary 1, 2024
              </time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                {i18next.t("home.roadmap.p2.sub")}
              </p>
            </div>
          </li>
          <li class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
              <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg
                  class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pe-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {i18next.t("home.roadmap.p3.title")}
              </h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                March 1, 2024
              </time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                {i18next.t("home.roadmap.p3.sub")}
              </p>
            </div>
          </li>
          <li class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
              <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg
                  class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pe-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {i18next.t("home.roadmap.p4.title")}
              </h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                March 30, 2024
              </time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                {i18next.t("home.roadmap.p4.sub")}
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {i18next.t("home.roadmap.title")}
          </h2>
          <div className="mt-10">
            <div className="mb-8">
              <div className="milestone">
                <span className="milestone-date">2024-01-20</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">
                    {i18next.t("home.roadmap.p1.title")}
                  </h3>
                  <p className="milestone-description">
                    {i18next.t("home.roadmap.p1.sub")}
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">2024-01-30</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">
                    {i18next.t("home.roadmap.p2.title")}
                  </h3>
                  <p className="milestone-description">
                    {i18next.t("home.roadmap.p2.sub")}
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">2024-02-15</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">
                    {i18next.t("home.roadmap.p3.title")}
                  </h3>
                  <p className="milestone-description">
                    {i18next.t("home.roadmap.p3.sub")}
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">2024-03-30</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">
                    {i18next.t("home.roadmap.p4.title")}
                  </h3>
                  <p className="milestone-description">
                    {i18next.t("home.roadmap.p4.sub")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
