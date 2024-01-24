// Import necessary React and Tailwind CSS components
import React from "react";
import i18next from "../../app/i18n";

const Introduction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-600 to-purple-600 py-16">
      <div className="text-center">
        <h1 className="text-white text-6xl font-bold">
          {i18next.t("home.intro.title")}
        </h1>
        <div className="flex flex-col md:flex-row mt-10">
          <div className="md:w-2/5"></div>
          <div className="md:w-3/5">
            <p className="text-gray-200 text-xl mx-10 text-left">
              {i18next.t("home.intro.sub")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row ">
        <div className="md:w-2/5 hidden md:block">
          <img className="p-10 blur-xl" src="/ming_logo_large.png" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-3/5 p-4">
          <Card
            imageUrl="/icon_qin.png"
            title={i18next.t("home.intro.card1.title")}
            description={i18next.t("home.intro.card1.sub")}
          />
          <Card
            imageUrl="/icon_fire.png"
            title={i18next.t("home.intro.card2.title")}
            description={i18next.t("home.intro.card2.sub")}
          />
          <Card
            imageUrl="/icon_launch.png"
            title={i18next.t("home.intro.card3.title")}
            description={i18next.t("home.intro.card3.sub")}
          />
          {/* <Card
            imageUrl="/icon_qin.png"
            title="Not just a meme"
            description="$MING is desigend to solve hyper-inflation in the afterlife. Read the whitepaper to learn more."
          /> */}
          <Card
            imageUrl="/icon_carbon.png"
            title={i18next.t("home.intro.card4.title")}
            description={i18next.t("home.intro.card4.sub")}
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="p-8 text-left min-w-[360px] break-words">
      <img src={imageUrl} alt="" className="mb-4 h-12 " />{" "}
      <h2 className="text-xl text-white font-semibold ">{title}</h2>
      <p className="text-gray-200 mt-4 ">{description}</p>
    </div>
  );
};

export default Introduction;
