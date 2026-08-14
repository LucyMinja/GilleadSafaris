'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Award, Heart, Shield, Leaf, Globe, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const team = [
  { name: 'Nicanory Erasto', role: 'Reservation Manager', photo: '/images/team/nic.png' },
  { name: 'Dr. Rose Mongi', role: 'Team Leader', photo: '/images/team/rose.png' },
  { name: 'Victor Mosses', role: 'Customer Consultant', photo: '/images/team/vic.png' },
  { name: 'Faith', role: 'Sales and Marketing', photo: '/images/team/faith.png' },
];

const stats = [
  { number: '2020', label: 'Established' },
  { number: '5000+', label: 'Happy Travelers' },
  { number: '98%', label: 'Satisfaction Rate' },
  { number: '25+', label: 'Tour Packages' },
];

const values = [
  {
    icon: Award,
    title: 'Expert Guides',
    description: 'Certified and knowledgeable guides with deep understanding of Tanzanian wildlife and culture',
  },
  {
    icon: Heart,
    title: 'Personalized Service',
    description: 'Every safari is tailored to your preferences, ensuring an unforgettable experience',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Your safety is our priority with comprehensive insurance and well-maintained vehicles',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Committed to sustainable tourism that protects wildlife and supports local communities',
  },
  {
    icon: Globe,
    title: 'Local Expertise',
    description: 'Born and raised in Tanzania, we know the hidden gems and best times to visit',
  },
  {
    icon: TrendingUp,
    title: 'Best Value',
    description: 'Competitive pricing without compromising on quality or experience',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#1A1208]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-[#e8d4b8]">
            About Gillead Safaris
          </h2>
          <p className="text-xl text-[#d4a574] max-w-3xl mx-auto">
            Gillead stands for great world adventure — we believe that the service we are providing are great for the world
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#2C1810] rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl md:text-6xl text-[#d4a574] mb-3">
                {stat.number}
              </div>
              <div className="text-[#e8d4b8]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Section with Image */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl text-[#e8d4b8] mb-6">
              Our Story
            </h3>
            <div className="space-y-4 text-[#d4a574]">
              <p>
                Gillead Safaris is a company that deals with safari and tour operation in Tanzania where our main office is located in Arusha, Tanzania.
              </p>
              <p>
                The company was established in 2020 with the intention of providing quality service and affordable prices so as you can experience the best memorable adventure during your African expedition in Tanzania.
              </p>
              <p>
                We have our own office and team in Arusha. This enables us to arrange and oversee your entire journey from start to finish. Our team consists of experts and locals that love the country and know much about the culture. We guarantee the best prices and quality for your Tanzania vacation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1741850819375-5de72125719e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxUYW56YW5pYSUyMGxhbmRzY2FwZSUyMHNhdmFubmElMjBzdW5zZXR8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Tanzania Landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/60 to-transparent" />
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#2C1810] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-[#d4a574]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <value.icon className="w-8 h-8 text-[#d4a574]" />
              </div>
              <h4 className="text-2xl text-[#e8d4b8] mb-4">
                {value.title}
              </h4>
              <p className="text-[#d4a574]">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cultural Experience Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-[#2C1810] to-[#1E140C] rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-80 lg:h-auto">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1549854005-e9d0edd14842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxNYWFzYWklMjBwZW9wbGUlMjBjdWx0dXJlJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Maasai Culture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="text-4xl text-[#e8d4b8] mb-6">
                Cultural Immersion
              </h3>
              <p className="text-[#d4a574] mb-6">
                Experience the rich traditions of Tanzania's indigenous peoples. Visit Maasai villages, learn traditional dances, participate in age-old ceremonies, and discover the wisdom passed down through generations.
              </p>
              <ul className="space-y-3 mb-8">
                {['Authentic village visits', 'Traditional ceremonies', 'Local craft workshops', 'Community support programs'].map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-[#e8d4b8]">
                    <div className="w-2 h-2 bg-[#d4a574] rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-[#d4a574] hover:bg-[#c49563] text-[#1e1e22] px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 self-start">
                Explore Cultural Tours
              </button>
            </div>
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-4xl text-[#e8d4b8] mb-2">Meet the Team</h3>
          <p className="text-[#d4a574] italic mb-12">The ones who make it happen</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#2C1810] rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-[#e8d4b8] font-semibold">{member.name}</h4>
                  <p className="text-[#d4a574] text-sm mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
