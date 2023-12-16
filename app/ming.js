export default function Ming() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-white h-screen">
        <div className="md:w-2/5 flex items-center justify-center p-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">$MING</h2>
            <p className="mt-4 text-lg text-gray-500">
              $MING is an ERC-20 token designed to be burnt to the people who
              passed away.
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1WXhmvFGXwOpCzt5NNAXEWGtSqgQuuns0uswm1RZfe2A/edit?usp=sharing"
              >
                Read white paper.
              </a>
            </p>
          </div>
        </div>
        <div className="md:w-3/5 p-8">
          <img
            src="/usd.webp"
            alt="About $MING"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </>
  );
}
