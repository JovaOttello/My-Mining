
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import ContentPopup from '../components/shared/ContentPopup';
import Card from '../components/shared/Card';
import { 
  aboutUs, 
  ourTeam, 
  careers, 
  referralProgram, 
  apiInfo 
} from '../data/companyContent';

// Define the content sections
const contentSections = [
  {
    id: 'about',
    title: 'About Us',
    description: 'Learn more about BitMine Social and our mission',
    content: aboutUs.description
  },
  {
    id: 'team',
    title: 'Our Team',
    description: 'Meet the experts behind BitMine Social',
    content: ourTeam.description + '\n\n' + 
      ourTeam.members.map(member => 
        `${member.name}, ${member.role}\n${member.bio}`
      ).join('\n\n')
  },
  {
    id: 'careers',
    title: 'Careers',
    description: 'Join our team and build the future of finance',
    content: careers.description + '\n\n' + 
      'Benefits:\n' + careers.benefits.join('\n') + '\n\n' +
      'Departments:\n' + careers.departments.map(dept => 
        `${dept.name}: ${dept.roles.join(', ')}`
      ).join('\n')
  },
  {
    id: 'referral',
    title: 'Referral Program',
    description: 'Earn while you share BitMine Social',
    content: referralProgram.description + '\n\n' +
      'Reward Tiers:\n' + referralProgram.tiers.map(tier => 
        `${tier.level} (${tier.requirements}):\n${tier.rewards.join('\n')}`
      ).join('\n\n') + '\n\n' +
      'How It Works:\n' + referralProgram.howItWorks.join('\n')
  },
  {
    id: 'api',
    title: 'API Documentation',
    description: 'Integrate mining data into your applications',
    content: apiInfo.description + '\n\n' +
      'Features:\n' + apiInfo.features.map(feature => 
        `${feature.name}:\n${feature.endpoints.join('\n')}`
      ).join('\n\n') + '\n\n' +
      'Technical Specifications:\n' + apiInfo.techSpecs.join('\n') + '\n\n' +
      'Getting Started:\n' + apiInfo.gettingStarted.join('\n')
  },
  {
    id: 'help',
    title: 'Help Center',
    description: 'Find answers to common questions',
    content: `Getting Started:
- New to BitMine Social? Follow our step-by-step guide to creating your account, completing verification, and making your first deposit
- Understanding your dashboard: A comprehensive overview of your mining statistics, earnings, and account management tools
- Making your first deposit: Detailed instructions for securely funding your account to begin mining

Account Management:
- Security best practices: How to enable two-factor authentication, manage API keys, and protect your account
- Verification requirements: Document guidelines and submission process for KYC/AML compliance
- Managing mining preferences: Adjusting hash power allocation and mining pool selections

Mining Operations:
- Understanding mining rewards: How Bitcoin mining rewards are calculated and distributed
- Hash rate explained: A beginner's guide to understanding mining power and performance metrics
- Network difficulty: How Bitcoin's difficulty adjustments affect mining profitability over time

Withdrawals and Payments:
- Withdrawal process: Step-by-step guide to requesting Bitcoin withdrawals to your wallet
- Payment schedules: Explanation of daily mining rewards calculations and distribution
- Transaction verification: How to track and confirm your deposit and withdrawal transactions

Troubleshooting:
- Common account issues and their solutions
- Deposit and withdrawal troubleshooting
- Technical support contact methods and expected response times`
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Legal terms governing use of our platform',
    content: `1. Service Agreement
By creating an account with BitMine Social, you agree to these Terms of Service in their entirety. Our services provide access to Bitcoin mining capacity through our cloud mining platform. BitMine Social reserves the right to modify these terms with reasonable notice to users.

2. Account Requirements
Users must be at least 18 years old and legally able to enter into binding contracts. Accounts require valid identification for verification purposes in compliance with applicable regulations. Each user is responsible for maintaining the security of their login credentials.

3. Mining Services
BitMine Social provides Bitcoin mining services through professionally managed mining hardware. Mining rewards are distributed based on the purchased hash power allocation, minus operational fees as disclosed in our fee schedule. Mining operations run continuously, subject to regular maintenance and unforeseen circumstances.

4. Payment Terms
Deposits must be made in Bitcoin according to our minimum requirements. Mining rewards are calculated daily and credited to users' accounts. Withdrawal requests are processed within 24 hours, subject to minimum withdrawal amounts and network confirmation times.

5. Service Limitations
BitMine Social does not guarantee mining profitability as Bitcoin mining is subject to network difficulty, Bitcoin price fluctuations, and operational costs. Service availability may be affected by maintenance, hardware failures, or force majeure events.

6. Termination
BitMine Social reserves the right to suspend or terminate accounts for violations of these terms, fraudulent activity, or as required by law. Users may terminate their accounts at any time, subject to any outstanding contractual obligations.

7. Dispute Resolution
Any disputes arising from these terms shall be resolved through good-faith negotiation, followed by binding arbitration if necessary, governed by the laws of the state of California without regard to conflict of law principles.`
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'How we handle and protect your data',
    content: `1. Information Collection
BitMine Social collects personal information including name, email, phone number, address, government ID details for verification, and cryptocurrency wallet addresses. We also collect transaction data, mining activity statistics, and technical information about your device and browsing behavior on our platform.

2. Use of Information
We use your information to provide and improve our services, process transactions, communicate with you, comply with legal obligations, detect and prevent fraud, and personalize your experience. Mining statistics are used for operational efficiency and performance reporting.

3. Information Sharing
BitMine Social does not sell user data to third parties. We share information with service providers who help us operate our platform, process payments, and maintain security. We may disclose information as required by law or to protect our rights and the safety of our users.

4. Data Security
We implement industry-standard security measures including encryption, access controls, regular security assessments, and employee training on data protection. While we strive to protect your information, no method of transmission over the internet is 100% secure.

5. Data Retention
We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements. You may request deletion of your data subject to legal retention requirements.

6. User Rights
Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal information. We provide tools in your account settings to exercise many of these rights directly.

7. Cookies and Tracking
Our platform uses cookies and similar technologies to enhance user experience, analyze usage patterns, and optimize performance. You can manage cookie preferences through your browser settings.

8. International Transfers
As a global service, your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.`
  }
];

const About = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Open the popup for the selected content
  const openPopup = (id: string) => {
    setActivePopup(id);
  };

  // Close the active popup
  const closePopup = () => {
    setActivePopup(null);
  };

  // Get the active content section
  const getActiveContent = () => {
    return contentSections.find(section => section.id === activePopup);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">About Us</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {contentSections.map((section) => (
                <Card key={section.id} variant="glass" hover padding="md" className="flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{section.description}</p>
                  <Button 
                    onClick={() => openPopup(section.id)}
                    className="mt-auto"
                  >
                    Read More
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Content Popup */}
      {activePopup && getActiveContent() && (
        <ContentPopup
          title={getActiveContent()?.title || ''}
          content={getActiveContent()?.content || ''}
          isOpen={!!activePopup}
          onClose={closePopup}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default About;
