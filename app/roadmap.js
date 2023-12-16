export default function Roadmap() {
  return (
    <>
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Roadmap</h2>

          <div className="mt-10">
            <div className="mb-8">
              <div className="milestone">
                <span className="milestone-date">20/12/2023</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Testing phase.1</h3>
                  <p className="milestone-description">
                    Released on testnet (without funding)
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">15/1/2024</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Testing phase.2</h3>
                  <p className="milestone-description">
                    Released on testnet (with funding)
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">1/2/2024</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Testing phase.3</h3>
                  <p className="milestone-description">
                    Funding on testnet ends
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">1/3/2024</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Main event: Funding</h3>
                  <p className="milestone-description">Released on mainnet</p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">15/3/2024</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Main event: Funing</h3>
                  <p className="milestone-description">
                    Funding on mainnet ends! Have fun with $MING!
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
