"use client";

const PrivacyPolicy = () => {
    return (
        <section className="bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                <SectionHeading title="Privacy Policy" />

                {/* Content Card */}
                <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-6 text-gray-700 leading-relaxed">

                    <p>
                        Mendel Academy (“we”, “our”, “us”) respects your privacy and is
                        committed to protecting the personal information of users who visit
                        or use our website{" "}
                        <a
                            href="https://mendelacademy.com"
                            target="_blank"
                            className="text-blue-600 underline"
                        >
                            https://mendelacademy.com
                        </a>
                        . By using our website, you agree to the practices described in this
                        Privacy Policy.
                    </p>

                    {/* Information We Collect */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Information We Collect
                        </h2>

                        <p className="mt-2 font-medium">Personal Information</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Mobile number</li>
                            <li>Address (if provided)</li>
                            <li>Educational details</li>
                            <li>Enquiry and form submission details</li>
                        </ul>

                        <p className="mt-3 font-medium">Payment Information</p>
                        <p>
                            Payments are processed through secure third-party payment gateways.
                            We do not store card or banking details on our servers.
                        </p>

                        <p className="mt-3 font-medium">Automatically Collected Information</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>IP address</li>
                            <li>Browser and device information</li>
                            <li>Pages visited</li>
                            <li>Date and time of visit</li>
                            <li>Referring website</li>
                        </ul>

                        <p className="mt-3 font-medium">Course Performance & Usage Data</p>
                        <p>Mendel Academy collects data such as quiz scores, Grand Test results, time spent on specific modules, progress through the Mendel Library, and interaction with flashcards.</p>
                    </div>

                    {/* How We Collect Information */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            How We Collect Information
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>When you fill enquiry or registration forms</li>
                            <li>When you contact us via website or email</li>
                            <li>When you enroll in our courses</li>
                            <li>When you browse our website</li>
                        </ul>
                    </div>

                    {/* How We Use Your Information */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            How We Use Your Information
                        </h2>
                        <p className="mt-2">
                            We process your data to fulfill our contract with you, based on your consent, and for our legitimate business interests.
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Provide and manage educational services</li>
                            <li>Respond to enquiries and requests</li>
                            <li>Process registrations and payments</li>
                            <li>Send important updates and communication</li>
                            <li>Improve website performance and services</li>
                            <li>Ensure security and prevent misuse</li>
                        </ul>
                    </div>

                    {/* Cookies */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Cookies and Tracking Technologies
                        </h2>
                        <p>
                            We use cookies to improve functionality, understand user behavior,
                            and enhance your experience. You can manage cookies through your
                            browser settings.
                        </p>
                    </div>

                    {/* Sharing */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Sharing of Information
                        </h2>
                        <p>We do not sell your personal information.</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>With trusted service providers</li>
                            <li>When required by law</li>
                            <li>To protect rights and safety of Mendel Academy</li>
                        </ul>
                    </div>

                    {/* Security */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Data Storage and Security
                        </h2>
                        <p>
                            We take reasonable technical and administrative measures to protect
                            your data. However, no online system is completely secure.
                        </p>
                    </div>

                    {/* Retention */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Data Retention
                        </h2>
                        <p>
                            We retain personal data only as long as necessary for services,
                            legal or operational requirements.
                        </p>
                    </div>

                    {/* Rights */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Your Rights
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Access your personal data</li>
                            <li>Request correction</li>
                            <li>Request deletion</li>
                            <li>Withdraw marketing consent</li>
                        </ul>
                        <p className="mt-2">
                            We will respond within 30 days to a request to delete or access data.
                        </p>
                    </div>

                    {/* Account Deletion Process */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Account Deletion Process
                        </h2>
                        <p>
                            You have the right to request the permanent deletion of your Mendel Academy account and associated personal data.
                        </p>
                        <p className="mt-2">
                            To initiate this request, please send an email to{" "}
                            <a href="mailto:admin@mendelacademy.com" className="text-blue-600 underline">
                                admin@mendelacademy.com
                            </a>{" "}
                            using the email address associated with your Mendel Academy account. Please use the subject line: "Account Deletion Request."
                        </p>
                        <p className="mt-2">
                            We will acknowledge your request within 48 hours and process the deletion within 30 days. Please note that deleting your account will permanently erase your course progress, Qbank history, and access to all purchased materials. We may retain basic transactional records (such as payment receipts) solely for legal and tax compliance purposes.
                        </p>
                    </div>

                    {/* Communications and Opt-Out */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Communications and Opt-Out
                        </h2>
                        <p>
                            You can opt out of promotional emails by clicking the 'unsubscribe' link at the bottom of our emails, or reply 'STOP' to SMS/WhatsApp messages. You will still receive essential transactional emails (like purchase receipts, password resets, and course updates).
                        </p>
                    </div>

                    {/* Third Party */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Third-Party Links
                        </h2>
                        <p>
                            We are not responsible for privacy practices of third-party
                            websites linked on our platform.
                        </p>
                    </div>

                    {/* Children */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Children’s Privacy
                        </h2>
                        <p>
                            Our services are not intended for children under 13 years of age.
                        </p>
                    </div>

                    {/* International */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            International Data Transfer
                        </h2>
                        <p>
                            Your data may be stored or processed on servers located outside
                            your state or country.
                        </p>
                    </div>

                    {/* Changes */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy at any time. Changes will be
                            effective immediately upon posting.
                        </p>
                    </div>

                    {/* Grievance Officer */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Grievance Officer (Mandatory for India)
                        </h2>
                        <p>
                            In accordance with the Information Technology Act, 2000, and the DPDP Act, the name and contact details of the Grievance Officer are provided below:
                        </p>
                        <p className="mt-2">
                            <strong>Gargi Managoli / CMO</strong><br />
                            📧 Email: <a href="mailto:gargi.m@mendelacademy.com" className="text-blue-600 underline">gargi.m@mendelacademy.com</a>
                        </p>
                        <p className="mt-2">
                            We will acknowledge your concern within 24 hours and aim to resolve it within 15 days.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className=" mx-auto">
                        <h2 className="font-semibold text-xl text-gray-900 border-b pb-2">
                            Contact Us
                        </h2>

                        <div className="mt-4 space-y-2 text-gray-700 text-sm">
                            <p className="font-medium text-gray-900">Mendel Academy</p>

                            <p>📞 Mobile: 99255 11511 / +1 310-708-3244</p>
                            <p>📧 Email: drmanagoli@mendelacademy.com / info@mendelacademy.com</p>
                            <p>
                                🌐 Website:{" "}
                                <a
                                    href="https://mendelacademy.com"
                                    target="_blank"
                                    className="text-blue-600 hover:underline"
                                >
                                    mendelacademy.com
                                </a>
                            </p>
                        </div>

                        {/* Address Section */}
                        <div className="mt-6 grid md:grid-cols-2 gap-6">

                            {/* India Address */}
                            <div className="bg-gray-50 p-4 rounded-xl border">
                                <h3 className="font-semibold text-gray-900 mb-2">India Office</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Apt 102, Sangit Sarita Complex,<br />
                                    New Rander Rd, near Amidhara Wadi,<br />
                                    Near United Hospital, Adajan,<br />
                                    Surat, Gujarat – 395009, India
                                </p>
                            </div>

                            {/* USA Address */}
                            <div className="bg-gray-50 p-4 rounded-xl border">
                                <h3 className="font-semibold text-gray-900 mb-2">USA Office</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    2108 N ST STE N SACRAMENTO,<br />
                                    CA 95816, USA
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;

const SectionHeading = ({ title }: { title: string }) => (
    <div className="text-center mb-10">
        <h2 className="text-5xl md:text-6xl font-extrabold ff-font">
            {title}
        </h2>
    </div>
);
