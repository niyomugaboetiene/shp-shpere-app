// import { useState } from "react";
// import { FaShieldAlt, FaUserShield, FaDatabase, FaCookieBite, FaEye, FaKey } from "react-icons/fa";

// const PrivacyPolicy = () => {
//   const [activeSection, setActiveSection] = useState(0);

//   const policySections = [
//     {
//       icon: <FaUserShield className="text-2xl" />,
//       title: "Information We Collect",
//       content: `We collect information that you provide directly to us, including:
// • Personal details (name, email, phone number)
// • Account credentials and preferences
// • Transaction and payment information
// • Communication records with our support team
// • Product reviews and feedback

// We also automatically collect certain information about your device and usage patterns through cookies and similar technologies.`
//     },
//     {
//       icon: <FaDatabase className="text-2xl" />,
//       title: "How We Use Your Information",
//       content: `Your information helps us provide and improve our services:
// • Process transactions and deliver products
// • Personalize your shopping experience
// • Communicate about orders, products, and promotions
// • Improve our platform and develop new features
// • Ensure security and prevent fraud
// • Comply with legal obligations`
//     },
//     {
//       icon: <FaShieldAlt className="text-2xl" />,
//       title: "Data Protection",
//       content: `We implement robust security measures to protect your data:
// • SSL encryption for all data transmissions
// • Regular security audits and monitoring
// • Limited employee access to personal data
// • Secure payment processing partners
// • Data anonymization where possible
// • Regular backup and recovery procedures`
//     },
//     {
//       icon: <FaCookieBite className="text-2xl" />,
//       title: "Cookies & Tracking",
//       content: `We use cookies and similar technologies to:
// • Remember your preferences and settings
// • Analyze site traffic and usage patterns
// • Deliver personalized content and ads
// • Enable social media features
// • Improve overall user experience

// You can control cookie settings through your browser preferences.`
//     },
//     {
//       icon: <FaEye className="text-2xl" />,
//       title: "Your Rights",
//       content: `You have the right to:
// • Access and review your personal data
// • Correct inaccurate information
// • Request deletion of your data
// • Object to data processing
// • Data portability
// • Withdraw consent at any time

// Contact our privacy team to exercise these rights.`
//     },
//     {
//       icon: <FaKey className="text-2xl" />,
//       title: "Third-Party Sharing",
//       content: `We may share information with:
// • Payment processors for transaction completion
// • Shipping partners for order delivery
// • Analytics providers for service improvement
// • Legal authorities when required by law
// • Business partners with your consent

// We ensure all partners maintain adequate data protection standards.`
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
//             Privacy Policy
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
//             Your privacy is our priority. Learn how we protect and handle your data.
//           </p>
//           <div className="text-sm text-gray-500">
//             Last updated: {new Date().toLocaleDateString()}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Navigation */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-8 space-y-2">
//                 {policySections.map((section, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveSection(index)}
//                     className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
//                       activeSection === index
//                         ? 'bg-gray-900 text-white shadow-lg'
//                         : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//                     }`}
//                   >
//                     {section.title}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="lg:col-span-3">
//               <div className="bg-gray-900 rounded-2xl p-8 text-white hover:-translate-y-2 transition-all duration-300">
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
//                     {policySections[activeSection].icon}
//                   </div>
//                   <h2 className="text-3xl font-black text-green-400">
//                     {policySections[activeSection].title}
//                   </h2>
//                 </div>
                
//                 <div className="prose prose-lg max-w-none text-gray-300">
//                   <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
//                     {policySections[activeSection].content}
//                   </pre>
//                 </div>
//               </div>

//               {/* Additional Info */}
//               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
//                   <h3 className="text-xl font-black text-gray-900 mb-3">Contact Our Privacy Team</h3>
//                   <p className="text-gray-600 mb-4">
//                     Have questions about your privacy? Our dedicated team is here to help.
//                   </p>
//                   <a 
//                     href="mailto:niyomugaboetiene53@gmail.com" 
//                     className="text-green-500 font-bold hover:text-green-600 transition-colors"
//                   >
//                     niyomugaboetiene53@gmail.com
//                   </a>
//                 </div>

//                 <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
//                   <h3 className="text-xl font-black text-gray-900 mb-3">Policy Updates</h3>
//                   <p className="text-gray-600">
//                     We regularly review and update our privacy policy. Check back for the latest version.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-black text-gray-900 mb-8">Privacy Controls</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <button className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-green-500 hover:shadow-xl transition-all duration-300 group">
//               <FaUserShield className="text-3xl text-gray-600 group-hover:text-green-500 mx-auto mb-4 transition-colors" />
//               <h3 className="font-bold text-gray-900 mb-2">Manage Preferences</h3>
//               <p className="text-gray-600 text-sm">Control your communication preferences</p>
//             </button>

//             <button className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-green-500 hover:shadow-xl transition-all duration-300 group">
//               <FaDatabase className="text-3xl text-gray-600 group-hover:text-green-500 mx-auto mb-4 transition-colors" />
//               <h3 className="font-bold text-gray-900 mb-2">Data Export</h3>
//               <p className="text-gray-600 text-sm">Download your personal data</p>
//             </button>

//             <button className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-green-500 hover:shadow-xl transition-all duration-300 group">
//               <FaKey className="text-3xl text-gray-600 group-hover:text-green-500 mx-auto mb-4 transition-colors" />
//               <h3 className="font-bold text-gray-900 mb-2">Account Security</h3>
//               <p className="text-gray-600 text-sm">Update password and security settings</p>
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PrivacyPolicy;