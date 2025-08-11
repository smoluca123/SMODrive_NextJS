import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Cookie,
  Mail,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Last updated: January 2025
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary" />
              Quick Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="#overview"
                className="text-primary hover:text-primary/80"
              >
                1. Overview
              </Link>
              <Link
                href="#collection"
                className="text-primary hover:text-primary/80"
              >
                2. Information We Collect
              </Link>
              <Link
                href="#usage"
                className="text-primary hover:text-primary/80"
              >
                3. How We Use Information
              </Link>
              <Link
                href="#sharing"
                className="text-primary hover:text-primary/80"
              >
                4. Information Sharing
              </Link>
              <Link
                href="#security"
                className="text-primary hover:text-primary/80"
              >
                5. Data Security
              </Link>
              <Link
                href="#cookies"
                className="text-primary hover:text-primary/80"
              >
                6. Cookies and Tracking
              </Link>
              <Link
                href="#rights"
                className="text-primary hover:text-primary/80"
              >
                7. Your Rights
              </Link>
              <Link
                href="#contact"
                className="text-primary hover:text-primary/80 "
              >
                8. Contact Us
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <Card id="overview">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                1. Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                At ShareEarn, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our file sharing and
                profit-sharing platform.
              </p>
              <p>
                By using our service, you agree to the collection and use of
                information in accordance with this policy. We will not use or
                share your information with anyone except as described in this
                Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card id="collection">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                2. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h4>Personal Information</h4>
              <p>When you create an account, we collect:</p>
              <ul>
                <li>Name and email address</li>
                <li>Username and password</li>
                <li>Payment information (for earnings withdrawal)</li>
                <li>Profile information you choose to provide</li>
              </ul>

              <h4>Usage Information</h4>
              <p>
                We automatically collect information about how you use our
                service:
              </p>
              <ul>
                <li>Files uploaded, downloaded, and shared</li>
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our platform</li>
                <li>Referral sources and click data</li>
              </ul>

              <h4>File Information</h4>
              <p>For files you upload, we collect:</p>
              <ul>
                <li>File names, sizes, and types</li>
                <li>Upload and access timestamps</li>
                <li>Download statistics and analytics</li>
                <li>File metadata (when available)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card id="usage">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                3. How We Use Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We use the collected information for the following purposes:
              </p>

              <h4>Service Provision</h4>
              <ul>
                <li>Provide and maintain our file sharing service</li>
                <li>Process file uploads and downloads</li>
                <li>Calculate and distribute earnings</li>
                <li>Provide customer support</li>
              </ul>

              <h4>Platform Improvement</h4>
              <ul>
                <li>Analyze usage patterns to improve our service</li>
                <li>Develop new features and functionality</li>
                <li>Monitor and prevent fraud and abuse</li>
                <li>Ensure platform security and stability</li>
              </ul>

              <h4>Communication</h4>
              <ul>
                <li>Send important service notifications</li>
                <li>Provide earnings and payment updates</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card id="sharing">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-600" />
                4. Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>

              <h4>Service Providers</h4>
              <p>
                We may share information with trusted third-party service
                providers who assist us in operating our platform, such as
                payment processors, cloud storage providers, and analytics
                services.
              </p>

              <h4>Legal Requirements</h4>
              <p>
                We may disclose your information if required by law, court
                order, or government regulation, or to protect our rights,
                property, or safety, or that of our users or the public.
              </p>

              <h4>Business Transfers</h4>
              <p>
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred as part of the business
                transaction, subject to confidentiality agreements.
              </p>

              <h4>Consent</h4>
              <p>
                We may share your information with your explicit consent for
                specific purposes not covered in this policy.
              </p>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card id="security">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-600" />
                5. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information:
              </p>

              <h4>Technical Safeguards</h4>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Secure server infrastructure and regular updates</li>
                <li>Access controls and authentication systems</li>
                <li>Regular security audits and monitoring</li>
              </ul>

              <h4>Organizational Measures</h4>
              <ul>
                <li>Employee training on data protection</li>
                <li>Limited access to personal information</li>
                <li>Incident response procedures</li>
                <li>Regular review of security practices</li>
              </ul>

              <p>
                While we strive to protect your information, no method of
                transmission over the internet or electronic storage is 100%
                secure. We cannot guarantee absolute security but are committed
                to protecting your data using industry-standard practices.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card id="cookies">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="w-5 h-5 mr-2 text-yellow-600" />
                6. Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h4>What Are Cookies</h4>
              <p>
                Cookies are small text files stored on your device that help us
                provide and improve our service. We use both session cookies
                (which expire when you close your browser) and persistent
                cookies (which remain until deleted).
              </p>

              <h4>Types of Cookies We Use</h4>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for basic
                  platform functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how you
                  use our service
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and preferences
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used for targeted
                  advertising (with consent)
                </li>
              </ul>

              <h4>Managing Cookies</h4>
              <p>
                You can control cookies through your browser settings. However,
                disabling certain cookies may affect the functionality of our
                platform. You can also opt out of analytics tracking through our
                privacy settings.
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card id="rights">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                7. Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>

              <h4>Access and Portability</h4>
              <ul>
                <li>Request access to your personal information</li>
                <li>Receive a copy of your data in a portable format</li>
                <li>View how your information is being used</li>
              </ul>

              <h4>Correction and Deletion</h4>
              <ul>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Update your account information at any time</li>
              </ul>

              <h4>Control and Consent</h4>
              <ul>
                <li>Withdraw consent for data processing</li>
                <li>Object to certain types of data processing</li>
                <li>Opt out of marketing communications</li>
                <li>Restrict how we process your information</li>
              </ul>

              <p>
                To exercise these rights, please contact us using the
                information provided in the Contact section. We will respond to
                your request within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card id="contact">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-600" />
                8. Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Privacy Officer:</strong> privacy@shareearn.com
                </p>
                <p>
                  <strong>General Inquiries:</strong> support@shareearn.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Tech Street, San Francisco, CA
                  94105
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>

              <h4>Data Protection Officer (EU)</h4>
              <p>
                For users in the European Union, you can contact our Data
                Protection Officer at: dpo@shareearn.com
              </p>

              <h4>Updates to This Policy</h4>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date. We
                encourage you to review this Privacy Policy periodically for any
                changes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/terms">
              <Button variant="outline">View Terms of Service</Button>
            </Link>
            <Link href="/register">
              <Button>Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
