"use client";

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto text-gray-800">
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-6">Return & Refund Policy</h1>

        {/* Intro */}
        <p className="mb-4">
          Thank you for choosing Mendel Academy. This Return and Refund Policy
          applies to all purchases made on{" "}
          <a
            href="https://mendelacademy.com"
            className="text-blue-600 underline"
            target="_blank"
          >
            https://mendelacademy.com
          </a>
          .
        </p>

        {/* Nature of Services */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Nature of Services</h2>
        <p>
          Mendel Academy provides digital education services including coaching
          programs, online and offline training sessions. No physical goods are
          sold.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          <strong>Digital Content Access:</strong> By purchasing a digital course or Qbank subscription, you are requesting immediate access to our proprietary educational content. You acknowledge and agree that once access is granted or content is downloaded, you waive any statutory right of withdrawal or "cooling-off" period that may apply in your jurisdiction.
        </p>

        {/* Refund Policy */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Refund Policy</h2>
        <p className="font-semibold text-red-600">
          No refund will be provided under any circumstances once:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Course access has been provided</li>
          <li>Classes have started</li>
          <li>Study material has been shared</li>
          <li>
            <strong>Offline/Live Training Sessions:</strong> For in-person, live, or offline training programs, no refunds will be issued if a cancellation request is made within 14 days of the scheduled event start date, as seating and resources are allocated in advance.
          </li>
        </ul>

        {/* Exceptional Cases */}
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Refunds in Exceptional Cases
        </h2>
        <p>Refunds may be considered only in the following situations:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Duplicate payment</li>
          <li>Payment deducted but enrollment not completed</li>
          <li>Technical error from our side</li>
        </ul>
        <p className="mt-2">
          You must contact us within 3 days of the payment date.
        </p>

        {/* Non-Refundable */}
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Non-Refundable Situations
        </h2>
        <ul className="list-disc ml-6 mt-2">
          <li>Change of mind</li>
          <li>Personal schedule issues</li>
          <li>Lack of participation</li>
          <li>Dissatisfaction after accessing the course</li>
          <li>Failure to attend classes</li>
          <li>
            <strong>Subscription Renewals & Cancellations:</strong> For subscription-based plans that renew automatically, it is the student's responsibility to cancel their subscription before the next billing cycle begins. We do not provide refunds for recurring charges if you forget to cancel. If you cancel your subscription, you will retain access to the platform until the end of your currently paid billing period.
          </li>
        </ul>

        {/* Refund Process */}
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Refund Request Process
        </h2>
        <p>To request a refund, please contact us at:</p>
        <p className="mt-2">
          Email: drmanagoli@mendelacademy.com <br />
          Phone: 99255 11511
        </p>
        <p className="mt-2">Please include:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Student name</li>
          <li>Registered email or mobile number</li>
          <li>Payment reference number</li>
          <li>Reason for refund request</li>
        </ul>

        {/* Refund Method */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Refund Method</h2>
        <p>
          Approved refunds will be processed using the original payment method.
          Processing time may take 7–10 working days.
        </p>

        {/* Chargebacks */}
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Chargebacks and Payment Disputes
        </h2>
        <p>
          We encourage all students to contact us directly to resolve any billing issues. If you initiate a chargeback or dispute with your bank or credit card provider without contacting us first, your Mendel Academy account and all course access will be immediately suspended pending the outcome of the dispute. Fraudulent chargebacks will be disputed with evidence of course access and login activity.
        </p>

        {/* Contact */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Information</h2>
        <p>
          Mendel Academy <br />
          Email: drmanagoli@mendelacademy.com <br />
          Phone: 99255 11511
        </p>
        <p className="mt-2">
          Apt 102, Sangit Sarita Complex,
          <br />
          New Rander Rd, near Amidhara Wadi,
          <br />
          Near United Hospital, Giriraj Society,
          <br />
          Adajan, Surat, Gujarat – 395009
        </p>
      </div>
    </div>
  );
}
