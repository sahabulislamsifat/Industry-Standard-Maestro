const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-lg w-full text-center p-8 bg-white rounded-2xl shadow-xl">
        {/* Emoji decoration */}
        <div className="text-8xl mb-6">😕</div>

        {/* Main title */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

        {/* Subtitle */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          Oops! It seems like the page you're looking for has wandered off into
          the digital void.
        </p>

        {/* Home button */}
        <button
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
          onClick={() => (window.location.href = "/")}
        >
          🏠 Return Home
        </button>

        {/* Additional decorative elements */}
        <div className="mt-10 flex justify-center space-x-4">
          <span className="text-2xl">🔍</span>
          <span className="text-2xl">🌐</span>
          <span className="text-2xl">📱</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
