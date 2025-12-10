import { Heading, Text } from "@/components/ui/Typography";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-20 bg-arctic-ice/10">
            <div className="bg-arctic-blue py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <Heading level={1} className="text-white mb-4">Privacy Policy</Heading>
                    <p className="text-xl text-arctic-ice/80 max-w-2xl mx-auto">
                        How we handle your data at Greenland Sea Safari
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-arctic-ice/20 space-y-8">
                    <section>
                        <Heading level={2} className="mb-4 text-2xl">1. Introduction</Heading>
                        <Text>
                            Greenland Sea Safari (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or book a tour with us.
                        </Text>
                    </section>

                    <section>
                        <Heading level={2} className="mb-4 text-2xl">2. Information We Collect</Heading>
                        <Text className="mb-4">
                            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                        </Text>
                        <ul className="list-disc pl-6 space-y-2 text-arctic-night/80">
                            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you book a tour.</li>
                            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                        </ul>
                    </section>

                    <section>
                        <Heading level={2} className="mb-4 text-2xl">3. Use of Your Information</Heading>
                        <Text className="mb-4">
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                        </Text>
                        <ul className="list-disc pl-6 space-y-2 text-arctic-night/80">
                            <li>Process your booking and payments.</li>
                            <li>Email you regarding your booking.</li>
                            <li>Compile anonymous statistical data and analysis for use internally.</li>
                            <li>Respond to customer service requests.</li>
                        </ul>
                    </section>

                    <section>
                        <Heading level={2} className="mb-4 text-2xl">4. Cookie Policy</Heading>
                        <Text>
                            We use cookies to help customize the Site and improve your experience. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
                        </Text>
                    </section>

                    <section>
                        <Heading level={2} className="mb-4 text-2xl">5. Contact Us</Heading>
                        <Text>
                            If you have questions or comments about this Privacy Policy, please contact us at:
                            <br /><br />
                            <strong>Greenland Sea Safari</strong><br />
                            Ilulissat, Greenland<br />
                            Phone: +299 483328<br />
                            Email: info@greenlandseasafari.com
                        </Text>
                    </section>
                </div>
            </div>
        </div>
    );
}
