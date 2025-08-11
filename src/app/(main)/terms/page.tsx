'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
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
              Terms of Service
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
              <FileText className="w-5 h-5 mr-2" />
              Quick Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="#acceptance"
                className="text-primary hover:text-primary/80"
              >
                1. Acceptance of Terms
              </Link>
              <Link
                href="#services"
                className="text-primary hover:text-primary/80"
              >
                2. Description of Services
              </Link>
              <Link
                href="#accounts"
                className="text-primary hover:text-primary/80"
              >
                3. User Accounts
              </Link>
              <Link
                href="#content"
                className="text-primary hover:text-primary/80"
              >
                4. Content and Conduct
              </Link>
              <Link
                href="#earnings"
                className="text-primary hover:text-primary/80"
              >
                5. Earnings and Payments
              </Link>
              <Link
                href="#intellectual"
                className="text-primary hover:text-primary/80"
              >
                6. Intellectual Property
              </Link>
              <Link
                href="#privacy"
                className="text-primary hover:text-primary/80"
              >
                7. Privacy and Data
              </Link>
              <Link
                href="#termination"
                className="text-primary hover:text-primary/80"
              >
                8. Termination
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <Card id="acceptance">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                1. Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                By accessing and using ShareEarn (&quot;the Service&quot;), you
                accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of
                our file sharing and profit-sharing platform operated by
                ShareEarn Inc. (&quot;us&quot;, &quot;we&quot;, or
                &quot;our&quot;).
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card id="services">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                2. Description of Services
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>ShareEarn provides the following services:</p>
              <ul>
                <li>File hosting and sharing capabilities</li>
                <li>Profit-sharing system based on file downloads and views</li>
                <li>Analytics and reporting tools</li>
                <li>User dashboard and account management</li>
                <li>Referral program</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any part
                of our services at any time with or without notice.
              </p>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card id="accounts">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                3. User Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h4>Account Registration</h4>
              <p>
                To use certain features of our service, you must register for an
                account. You agree to provide accurate, current, and complete
                information during registration and to update such information
                as necessary.
              </p>
              <h4>Account Security</h4>
              <p>
                You are responsible for safeguarding your account credentials
                and for all activities that occur under your account. You must
                immediately notify us of any unauthorized use of your account.
              </p>
              <h4>Account Eligibility</h4>
              <p>
                You must be at least 18 years old to create an account. By
                creating an account, you represent and warrant that you meet
                this age requirement.
              </p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card id="content">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                4. Content and Conduct
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h4>Prohibited Content</h4>
              <p>You agree not to upload, share, or distribute content that:</p>
              <ul>
                <li>Violates any applicable laws or regulations</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains malware, viruses, or harmful code</li>
                <li>Is defamatory, obscene, or offensive</li>
                <li>Promotes illegal activities</li>
                <li>Contains personal information of others without consent</li>
              </ul>
              <h4>Content Monitoring</h4>
              <p>
                We reserve the right to review, monitor, and remove any content
                that violates these terms or is otherwise objectionable at our
                sole discretion.
              </p>
              <h4>User Responsibility</h4>
              <p>
                You are solely responsible for the content you upload and share.
                You represent and warrant that you have all necessary rights to
                share such content.
              </p>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card id="earnings">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                5. Earnings and Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h4>Earning System</h4>
              <p>
                Users can earn money through our profit-sharing system based on
                file downloads, views, and referrals. Earnings are calculated
                according to our current rate structure.
              </p>
              <h4>Payment Terms</h4>
              <p>
                Payments are processed monthly for accounts with a minimum
                balance of $10. We reserve the right to withhold payments for
                accounts under investigation or in violation of these terms.
              </p>
              <h4>Tax Responsibility</h4>
              <p>
                You are responsible for reporting and paying any applicable
                taxes on earnings received through our platform.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card id="intellectual">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                6. Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h4>Your Content</h4>
              <p>
                You retain ownership of content you upload to our service. By
                uploading content, you grant us a non-exclusive, worldwide,
                royalty-free license to host, store, and distribute your
                content.
              </p>
              <h4>Our Platform</h4>
              <p>
                The ShareEarn platform, including its design, functionality, and
                underlying technology, is owned by us and protected by
                intellectual property laws.
              </p>
              <h4>DMCA Compliance</h4>
              <p>
                We respect intellectual property rights and comply with the
                Digital Millennium Copyright Act (DMCA). If you believe your
                copyright has been infringed, please contact us with a proper
                DMCA notice.
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card id="privacy">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-600" />
                7. Privacy and Data
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Your privacy is important to us. Our collection and use of
                personal information is governed by our
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 ml-1"
                >
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
              <p>
                By using our service, you consent to the collection and use of
                your information as described in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card id="termination">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                8. Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h4>Termination by You</h4>
              <p>
                You may terminate your account at any time by contacting us or
                using the account deletion feature in your dashboard.
              </p>
              <h4>Termination by Us</h4>
              <p>
                We may terminate or suspend your account immediately, without
                prior notice, for conduct that we believe violates these Terms
                or is harmful to other users, us, or third parties.
              </p>
              <h4>Effect of Termination</h4>
              <p>
                Upon termination, your right to use the service will cease
                immediately. We may delete your account and all associated
                content, though we may retain certain information as required by
                law.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> legal@shareearn.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Tech Street, San Francisco, CA
                  94105
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/privacy">
              <Button variant="outline">View Privacy Policy</Button>
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
