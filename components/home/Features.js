import i18next from "../../app/i18n";
import Link from "next/link";

function FeatureCard({ title, description, imageUrl, cta, feature }) {
  return (
    <div className="bg-gray-800 col-span-1 m-4 p-8 rounded-lg shadow-md text-left break-words">
      <h3 className="text-5xl text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
      <img src={imageUrl} alt="" className="my-8 w-40 hidden md:block" />{" "}
      <div className="mt-4">
        {cta && <div>{cta}</div>}
        {feature && (
          <span className="bg-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded">
            {feature}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
    <div className="min-h-screen bg-gray-900 py-20 px-2 md:px-10">
      <div className="text-left px-10">
        <h1 className="text-white text-6xl font-bold">
          {i18next.t("home.feat.title")}
          </h1>
        <p className="mt-10">
          <Link
            href={process.env.NEXT_PUBLIC_WHITEPAPER}
            className="text-xl text-white hover:text-[#DDDDDD]"
          >
            {i18next.t("home.feat.sub")}
          </Link>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mt-6 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          <FeatureCard
            title={i18next.t("home.feat.card0.title")}
            description={i18next.t("home.feat.card0.sub")}
            cta={
              <Link
                href="/burn"
                className="text-xl text-white hover:text-[#DDDDDD]"
              >
                {i18next.t("home.feat.card0.cta")}
              </Link>
            }
            imageUrl="/icon_burn.png"
          />

          <FeatureCard
            title={i18next.t("home.feat.card1.title")}
            description={i18next.t("home.feat.card1.sub")}
            cta={
              <Link
                href="/deaderboard"
                className="text-xl text-white hover:text-[#DDDDDD]"
              >
                {i18next.t("home.feat.card1.cta")}
              </Link>
            }
            imageUrl="/icon_hall_of_fame.png"
          />


          {/* Card 3 - Liquidity Pools */}
          <FeatureCard
            title={i18next.t("home.feat.card3.title")}
            description={i18next.t("home.feat.card3.sub")}
            iconBgColor="bg-gradient-to-r from-green-400 to-blue-500"
            feature="Coming Soon"
            imageUrl="/icon_shop.png"
          />

          {/* Card 2 - Decentralized Exchange */}
          <FeatureCard
            title={i18next.t("home.feat.card2.title")}
            description={i18next.t("home.feat.card2.sub")}
            imageUrl="/icon_vote.png"
            cta={
              <Link
                href={process.env.NEXT_PUBLIC_WHITEPAPER}
                className="text-xl text-white hover:text-[#DDDDDD]"
              >
                {i18next.t("home.feat.card2.cta")}
              </Link>
            }
          />

          {/* <FeatureCard
            title={i18next.t("home.feat.card4.title")}
            description={i18next.t("home.feat.card4.sub")}
            iconBgColor="bg-gradient-to-r from-green-400 to-blue-500"
            imageUrl="/icon_house.png"
            feature="Coming Soon"
          /> */}

          <FeatureCard
            title={i18next.t("home.feat.card5.title")}
            description={i18next.t("home.feat.card5.sub")}
            iconBgColor="bg-gradient-to-r from-orange-400 to-red-500"
            imageUrl="/icon_govern.png"
            feature="Coming Soon"
          />
        </div>
      </div>
    </div>
  );
}
