import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";

export interface IPrivacyPolicyPageProps {}

const PrivacyPolicyPage: FC<IPrivacyPolicyPageProps> = () => {
  return (
    <div className="px-3 w-full">
      <div className="max-w-[720px] w-full mx-auto font-public-sans text-textColor py-8">
        <h1 className="font-bold text-2xl mb-4">
          Privacy Policy for Konvertify
        </h1>

        <p className="mb-4 text-sm">
          <span className="font-semibold text-base">Effective Date:</span>{" "}
          Tuesday 11 Feb 2025
        </p>

        <p className="mb-4 text-base font-normal">
          At Konvertify, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, and safeguard your data when you use our file conversion
          tool. Please read this policy carefully to understand our practices.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We collect minimal data to enhance your experience:
          </p>
          <ul
            className="list-disc mb-4 whitespace-pre-line"
            style={{
              marginBlockStart: "1em",
              marginBlockEnd: "1em",
              marginInlineStart: "0px",
              marginInlineEnd: "0px",
              paddingInlineStart: "20px",
            }}
          >
            <li>
              <strong>Usage Information : </strong> We utilize Google Analytics
              to collect anonymous data related to how you interact with
              Konvertify, such as the pages you visit, your IP address, browser
              type, device type, and referral URLs. This information allows us
              to understand how users engage with Konvertify and improve its
              functionality and content.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information collected through Google Analytics to
            understand user behavior and improve our tool's performance. We do
            not sell, rent, or share this information with third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Data Processing</h2>
          <p className="mb-4">
            Konvertify performs all file conversions locally on your device.
            Your files are never uploaded to our servers, ensuring your data
            remains private and secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies through Google
            Analytics to collect and store information about your interactions
            with our website. You can manage your cookie preferences through
            your browser settings. Please note that disabling cookies may impact
            your experience with Konvertify.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Third-Party Services
          </h2>
          <p className="mb-4">
            Konvertify may contain links to third-party websites or services. We
            are not responsible for the privacy practices of these websites, and
            we encourage you to review their respective privacy policies before
            providing any personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Children's Privacy</h2>
          <p className="mb-4">
            Konvertify is not intended for children under the age of 13, and we
            do not knowingly collect personal information from children. If you
            believe that your child has provided us with personal information,
            please contact us, and we will take steps to remove that
            information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            7. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time without prior
            notice. Any changes will be effective immediately upon posting the
            updated policy on this page, with the latest revision date indicated
            at the top.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at imkrrish227@gmail.com
          </p>
        </section>

        <p className="mt-4">
          By using Konvertify, you consent to the practices described in this
          Privacy Policy. If you do not agree with this policy, please
          discontinue using our services.
        </p>

        <p className="mt-4">
          Thank you for trusting Konvertify with your privacy!
        </p>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});
