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
                        <ul className="list-disc pl-6 space-y-1">
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

                    {/* Contact */}
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            Contact Us
                        </h2>
                        <p className="mt-2">
                            <strong>Mendel Academy</strong><br />
                            📞 Mobile: 99255 11511<br />
                            📧 Email: drmanagoli@mendelacademy.com<br />
                            🌐 Website: https://mendelacademy.com
                        </p>

                        <p className="mt-3">
                            Address:<br />
                            Apt 102, Sangit Sarita Complex,<br />
                            New Rander Rd, near Amidhara Wadi,<br />
                            Near United Hospital, Adajan,<br />
                            Surat, Gujarat – 395009, India
                        </p>
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
