import WalletConnect from "./walletConnect";
import i18next from "../../app/i18n";

export default function Banner({ onBurning }) {
  return (
    <>
      {/* Overlay Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black text-white text-sm p-2 text-center z-10">
        {i18next.t("home.banner.top")}
        View source code in{" "}
        <a href="https://github.com/shinado/ming-webapp">GitHub</a> and request
        to pull your code
      </div>

      {/* Banner */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/banner.png')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#330000] opacity-50"></div>

        {/* Content */}
        <div className="relative flex justify-center items-center h-full">
          <div className="text-center text-white">
            <h1 className="text-7xl font-bold">
              {i18next.t('home.banner.title')}
            </h1>
            <p className="text-2xl mt-4">{i18next.t('home.banner.sub')}</p>
            <p className="text-l mt-1">{i18next.t('home.banner.hint')}</p>
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
