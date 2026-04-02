interface IPhoneMockupProps {
  screenshot?: string;
  placeholderText?: string;
}

const IPhoneMockup = ({ screenshot, placeholderText = "App Screenshot" }: IPhoneMockupProps) => {
  return (
    <div className="relative mx-auto" style={{ width: "280px" }}>
      {/* iPhone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 border-8 border-gray-800">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10"></div>

        {/* Screen */}
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          {screenshot ? (
            <img
              src={screenshot}
              alt="App screenshot"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium">{placeholderText}</p>
              </div>
            </div>
          )}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
      </div>

      {/* Buttons */}
      <div className="absolute right-0 top-24 w-1 h-12 bg-gray-800 rounded-l"></div>
      <div className="absolute left-0 top-20 w-1 h-8 bg-gray-800 rounded-r"></div>
      <div className="absolute left-0 top-32 w-1 h-8 bg-gray-800 rounded-r"></div>
      <div className="absolute left-0 top-44 w-1 h-8 bg-gray-800 rounded-r"></div>
    </div>
  );
};

export default IPhoneMockup;
