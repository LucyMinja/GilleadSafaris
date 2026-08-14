'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    duration: '',
    guests: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      duration: '',
      guests: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#1A1208]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-[#e8d4b8]">
            Start Your Adventure
          </h2>
          <p className="text-xl text-[#d4a574] max-w-3xl mx-auto">
            Ready to experience the safari of a lifetime? Get in touch with our team and we'll create a personalized itinerary just for you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#2C1810] rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl text-[#e8d4b8] mb-6">
                Request a Quote
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#d4a574] mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#2C1810] border border-[#8b6f47]/30 rounded-lg px-4 py-3 text-[#e8d4b8] focus:border-[#d4a574] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[#d4a574] mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#2C1810] border border-[#8b6f47]/30 rounded-lg px-4 py-3 text-[#e8d4b8] focus:border-[#d4a574] focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#d4a574] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#2C1810] border border-[#8b6f47]/30 rounded-lg px-4 py-3 text-[#e8d4b8] focus:border-[#d4a574] focus:outline-none transition-colors"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#d4a574] mb-2">Destination</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-[#2C1810] border border-[#8b6f47]/30 rounded-lg px-4 py-3 text-[#e8d4b8] focus:border-[#d4a574] focus:outline-none transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="serengeti">Serengeti</option>
                      <option value="kilimanjaro">Kilimanjaro</option>
                      <option value="zanzibar">Zanzibar</option>
                      <option value="ngorongoro">Ngorongoro</option>
                      <option value="custom">Custom Tour</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#d4a574] mb-2">Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full bg-[#2C1810] border border-[#8b6f47]/30 rounded-lg px-4 py-3 text-[#e8d4b8] focus:border-[#d4a574] focus:outline-none transition-colors"
                    >
                      <option value="">Days</option>
                      <option value="3-5">3-5 Days</option>
                      <option value="6-8">6-8 Days</option>
                      <option value="9-12">9-12 Days</option>
                      <option value="12+">12+ Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#d4a574] mb-2">Guests</label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      className="w-full bg-[#2C1810] border border-[#8b6f47]/30 rounded-lg px-4 py-3 text-[#e8d4b8] focus:border-[#d4a574] focus:outline-none transition-colors"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#d4a574] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-[#2C1810] border border-[#8b6f47]/30 rounded-lg px-4 py-3 text-[#e8d4b8] focus:border-[#d4a574] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your dream safari..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#d4a574] hover:bg-[#c49563] text-[#1e1e22] py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Inquiry</span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-[#2C1810] rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl text-[#e8d4b8] mb-6">
                Get In Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#d4a574]/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <div className="text-[#d4a574] mb-1">Phone</div>
                    <a href="tel:+255753959375" className="text-[#e8d4b8] text-lg hover:text-[#d4a574] transition-colors">
                      +255 753 959 375
                    </a>
                    <div className="text-[#8b6f47] text-sm mt-1">WhatsApp available</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#d4a574]/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <div className="text-[#d4a574] mb-1">Email</div>
                    <a href="mailto:info@gillieadsafaris.com" className="text-[#e8d4b8] text-lg hover:text-[#d4a574] transition-colors">
                      info@gillieadsafaris.com
                    </a>
                    <div className="text-[#8b6f47] text-sm mt-1">We reply within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#d4a574]/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <div className="text-[#d4a574] mb-1">Location</div>
                    <div className="text-[#e8d4b8] text-lg">
                      Arusha, Tanzania
                    </div>
                    <div className="text-[#8b6f47] text-sm mt-1">Gateway to Northern Circuit</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#d4a574]/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <div className="text-[#d4a574] mb-1">Business Hours</div>
                    <div className="text-[#e8d4b8]">
                      Mon - Sat: 8:00 AM - 6:00 PM
                    </div>
                    <div className="text-[#8b6f47] text-sm mt-1">EAT (GMT+3)</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#d4a574]/20 p-3 rounded-lg">
                    <Globe className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <div className="text-[#d4a574] mb-1">Languages</div>
                    <div className="text-[#e8d4b8]">
                      English, Swahili, German, French
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#d4a574] to-[#c49563] rounded-2xl p-8 shadow-xl">
              <h4 className="text-2xl text-[#1e1e22] mb-4">
                Book Your Safari Today
              </h4>
              <p className="text-[#1e1e22]/80 mb-4">
                We guarantee the best prices and quality for your Tanzania vacation
              </p>
              <a
                href="tel:+255753959375"
                className="inline-block bg-[#241810] text-[#d4a574] px-6 py-3 rounded-lg hover:bg-[#241810] transition-colors duration-300"
              >
                Call: +255 753 959 375
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
