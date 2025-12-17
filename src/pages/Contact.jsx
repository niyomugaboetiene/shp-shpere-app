import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:5000/send", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full px-4 py-12 flex items-center justify-center"
    >
      <motion.div
        className="max-w-6xl w-full bg-green-800/70 rounded-xl shadow-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      > 
        <div className="space-y-6">
          <motion.h2 
            className="text-4xl font-bold text-green-500 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get In <span className="text-white">Touch</span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="name" className="block mb-2 font-medium text-gray-300">
                Your Name
              </label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="email" className="block mb-2 font-medium text-gray-300">
                Your Email
              </label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="message" className="block mb-2 font-medium text-gray-300">
                Your Message
              </label>
              <textarea 
                name="message" 
                id="message" 
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Write your message here..."
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold shadow-lg transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>
            
            {submitStatus === "success" && (
              <motion.div
                className="bg-green-900/50 text-green-100 rounded-lg p-3 text-center mt-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                className="bg-red-900/50 text-red-100 rounded-lg p-3 text-center mt-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Failed to send message. Please try again later.
              </motion.div>
            )}
          </form>
        </div>

        <div className="flex flex-col justify-center">
          <motion.h2 
            className="text-4xl font-bold text-green-500 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Contact <span className="text-white">Info</span>
          </motion.h2>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-600/20 rounded-full">
                <FaMapMarkerAlt className="text-green-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Location</h3>
                <p className="text-gray-300">Bugesera, Rwanda</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-600/20 rounded-full">
                <FaEnvelope className="text-green-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Email</h3>
                <p className="text-gray-300">niyomugaboetiene53@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-600/20 rounded-full">
                <FaPhoneAlt className="text-green-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Phone</h3>
                <p className="text-gray-300">+250 728 8184 299</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 hover:bg-blue-600 rounded-full transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-white text-xl" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 hover:bg-black rounded-full transition duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="text-white text-xl" />
              </a>
              <a 
                href="https://wa.me/+250728184299" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 hover:bg-green-600 rounded-full transition duration-300"
                aria-label="GitHub"
              >
                <FaWhatsapp className="text-white text-xl" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;