interface LaptopMockupProps {
  screenshot?: string;
  placeholderText?: string;
}

const LaptopMockup = ({ screenshot, placeholderText = "Dashboard Preview" }: LaptopMockupProps) => {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Laptop Screen */}
      <div className="bg-gray-900 rounded-t-2xl p-3 shadow-2xl border-4 border-gray-800">
        {/* Webcam */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full z-10"></div>

        {/* Screen Content */}
        <div className="bg-white rounded-lg overflow-hidden aspect-video">
          {screenshot ? (
            <img
              src={screenshot}
              alt="Dashboard screenshot"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-500 font-medium">{placeholderText}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Laptop Base */}
      <div className="relative h-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-2xl shadow-lg"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-t"></div>
      </div>

      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-2 bg-black/20 blur-xl rounded-full"></div>
    </div>
  );
};

export default LaptopMockup;
