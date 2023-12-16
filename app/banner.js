import WalletConnect from "./walletConnect";

export default function Banner({ onBurning }) {
  return (
    <>
      {/* Overlay Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black text-white text-sm p-2 text-center z-10">
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
            <h1 className="text-6xl font-bold">MING COIN</h1>
            <p className="text-2xl mt-4">
              A decentralized crypto currency used in afterlife
            </p>
            <WalletConnect
              onBurning={onBurning}
            />
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
