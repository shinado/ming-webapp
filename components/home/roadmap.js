import i18next from "../../app/i18n";

export default function Roadmap() {
  return (
    <>
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {i18next.t("home.roadmap.title")}
          </h2>

          <div className="mt-10">
            <div className="mb-8">
              <div className="milestone">
                <span className="milestone-date">2024-01-10</span>
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
                <span className="milestone-date">2024-03-15</span>
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
      </div>
    </>
  );
}
