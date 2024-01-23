import i18next from "../../app/i18n";

export default function Team() {
  const data = [
    {
      name: i18next.t("team.1.name"),
      title: i18next.t("team.1.title"),
      body: i18next.t("team.1.body"),
      avatar: "/grimreaper.webp",
    },
    {
      name: i18next.t("team.2.name"),
      title: i18next.t("team.2.title"),
      body: i18next.t("team.2.body"),
      avatar: "/hela.webp",
    },
    {
      name: i18next.t("team.3.name"),
      title: i18next.t("team.3.title"),
      body: i18next.t("team.3.body"),
      avatar: "/yanluo.webp",
    },
    {
      name: i18next.t("team.4.name"),
      title: i18next.t("team.4.title"),
      body: i18next.t("team.4.body"),
      avatar: "/anubis.webp",
    },
    {
      name: i18next.t("team.5.name"),
      title: i18next.t("team.5.title"),
      body: i18next.t("team.5.body"),
      avatar: "/shivo.webp",
    },
    {
      name: i18next.t("team.6.name"),
      title: i18next.t("team.6.title"),
      body: i18next.t("team.6.body"),
      avatar: "/ryuk.jpg",
    },
    {
      name: i18next.t("team.7.name"),
      title: i18next.t("team.7.title"),
      body: i18next.t("team.7.body"),
      avatar: "/mengpo.jpeg",
    },
  ];

  return (
    <>
      <div className="bg-gray-800 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl leading-9 font-extrabold text-white">
              {i18next.t("team.title")}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-100 sm:mt-4">
              {i18next.t("team.body")}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    className="mx-auto h-24 w-24 rounded-full mt-8"
                    src={member.avatar}
                    alt={member.name}
                  />
                  <div className="mt-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-100">
                      {member.name}
                    </h3>
                    <p className="text-sm text-indigo-200">{member.title}</p>
                    <p className="mt-1 text-sm text-gray-400">{member.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
