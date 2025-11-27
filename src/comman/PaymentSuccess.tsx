import React from "react";

const PaymentSuccess = () => {

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-md p-6 flex items-center space-x-4">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <div>
          <h2 className="text-lg font-semibold text-green-700">
            Payment Successful!
          </h2>
          <p className="text-green-600 text-sm">
            Your event registration has been confirmed.
          </p>
        </div>
      </div>

      {/* Details & Next Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Details */}
        <div>
          <h3 className="font-semibold mb-4">Order Details</h3>
          <dl className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt className="font-medium">Event:</dt>
              <dd>Sample Event Name</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Order ID:</dt>
              <dd className="font-bold">ORDER-1762516325822-ouviiylld</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Amount Paid:</dt>
              <dd>$10.89</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Registration Date:</dt>
              <dd>Nov 7, 2025</dd>
            </div>
          </dl>
        </div>

        {/* What's Next */}
        <div>
          <h3 className="font-semibold mb-4">What's Next?</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-yellow-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m0 0v-1m0 1v1m8-4v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h4"
                />
              </svg>
              <div>
                <strong>Confirmation Email</strong>
                <p className="text-gray-400 text-xs">
                  Sent to your email address
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-yellow-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m0 0V8m0 4v4m6-8v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8a2 2 0 012-2h4"
                />
              </svg>
              <div>
                <strong>Event Tickets</strong>
                <p className="text-gray-400 text-xs">
                  Available in your account
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-yellow-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                />
              </svg>
              <div>
                <strong>Event Reminder</strong>
                <p className="text-gray-400 text-xs">
                  You'll receive reminders before the event
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Done Button */}
      <div className="mt-8">
        <button
          className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-transform transform hover:scale-105"
          onClick={() => alert("Done clicked")}
        >
          Done
        </button>
      </div>

      {/* Support link */}
      <p className="mt-6 text-center text-xs text-blue-700">
        Need help?{" "}
        <a href="#" className="underline font-semibold">
          Contact our support team
        </a>{" "}
        or check your email for event details.
      </p>
    </div>
  );
};

export default PaymentSuccess;
