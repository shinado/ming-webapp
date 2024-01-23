import WalletConnect from "./walletConnect";
import i18next from "../../app/i18n";
import Link from "next/link";
import ReactPlayer from "react-player";

export default function Banner({ onBurning }) {
  return (
    <>
      {/* Banner */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/banner.png')` }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#330000] opacity-70"></div>

        {/* Content */}
        <div className="relative flex justify-center items-center h-full">
          <div className="text-center text-white">
            <h1 className="text-8xl font-bold">
              {i18next.t("home.banner.title")}
            </h1>
            <p className="text-xl mt-4">
              {i18next.t("home.banner.sub")}
              <Link href={process.env.NEXT_PUBLIC_WHITEPAPER}>{i18next.t("global.readwhitepaper")}</Link>
            </p>
            <p className="text-l mt-1">{i18next.t("home.banner.hint")}</p>
            <WalletConnect onBurning={onBurning} />
            {/* <button
              onClick={handleButtonClick}
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get $MING Now
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
