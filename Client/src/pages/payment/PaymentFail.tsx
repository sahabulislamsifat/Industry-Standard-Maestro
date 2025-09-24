import { XCircleIcon } from "lucide-react";

const PaymentFail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white shadow-lg p-8 text-center max-w-md w-full">
        <XCircleIcon className="h-20 w-20 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed ❌
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! Your payment was not successful. Please try again or contact
          support.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentFail;
