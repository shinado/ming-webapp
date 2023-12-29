export default function Decentralized() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-white h-screen">
        <div className="md:w-3/5 p-8">
          <img
            src="/eth-note.webp"
            alt="Fair Launch"
            className="object-cover h-full w-full rounded-md"
          />
        </div>
        <div className="md:w-2/5 flex items-center justify-center p-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Fair Launch
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              All $MINGs are distributed
              in a fair launch way. No pre-mined, no reserved distribution.
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1WXhmvFGXwOpCzt5NNAXEWGtSqgQuuns0uswm1RZfe2A/edit?usp=sharing"
              >
                Learn More.
              </a>
            </p>
            <p className="mt-4 text-lg text-gray-500">
              All codes are open-souced, which means you can request to change
              the website or add some features to it.
              <a
                target="_blank"
                href="https://github.com/mingcoineth/mingcoin"
                className="text-blue-600 hover:text-blue-800"
              >
                View in Github
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
