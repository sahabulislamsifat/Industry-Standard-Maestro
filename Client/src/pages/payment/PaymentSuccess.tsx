import { CheckCircleIcon } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg p-8 text-center max-w-md w-full">
        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was completed successfully. Thank you for your purchase!
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-green-500 text-white font-medium shadow hover:bg-green-600 transition"
        >
          Go to Home{" "}
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
