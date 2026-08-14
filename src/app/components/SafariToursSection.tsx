'use client';

import { motion } from 'motion/react';
import { Calendar, Users, Star, Check, Camera, Tent, Compass } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const safariPackages = [
  {
    title: 'The Great Migration Safari',
    image: 'https://images.unsplash.com/photo166987459629871da0f3db236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxTZXJlbmdldGklMjB3aWxkZWJlZXN0JTIwbWlncmF0aW9ufGVufDF8fHx8MTc4MDg1NjQ3MHww&ixlib=rb4.1.0&q=80&w=1080',
    duration: '7 Days / 6 Nights',
    groupSize: '26 People',
    rating: 4.9,
    reviews: 127,
    price: '$2,850',
    features: [
      'Witness the wildebeest migration',
      'Game drives in Serengeti',
      'Visit Ngorongoro Crater',
      'Luxury tented camps',
      'Professional safari guide',
      'All meals included',
    ],
    badge: 'Most Popular',
  },
  {
    title: 'Kilimanjaro Climbing Adventure',
    image: 'https://images.unsplash.com/photo1705292219152cb4782d65f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxNb3VudCUyMEtpbGltYW5qYXJvJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDY5fDA&ixlib=rb4.1.0&q=80&w=1080',
    duration: '8 Days / 7 Nights',
    groupSize: '412 People',
    rating: 4.8,
    reviews: 94,
    price: '$1,950',
    features: [
      'Machame Route (Whiskey Route)',
      'Experienced mountain guides',
      'Porter and chef support',
      'Camping equipment provided',
      'Summit certificate',
      'Acclimatization days',
    ],
    badge: 'Adventure',
  },
  {
    title: 'Safari & Beach Paradise',
    image: 'https://images.unsplash.com/photo1665449831038ba84c387a711?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxaYW56aWJhciUyMGJlYWNoJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcwfDA&ixlib=rb4.1.0&q=80&w=1080',
    duration: '10 Days / 9 Nights',
    groupSize: '28 People',
    rating: 5.0,
    reviews: 156,
    price: '$3,450',
    features: [
      '4 days safari (Serengeti & Ngorongoro)',
      '5 days Zanzibar beach resort',
      'Stone Town cultural tour',
      'Spice plantation visit',
      'Snorkeling & diving options',
      'Luxury accommodations',
    ],
    badge: 'Luxury',
  },
  {
    title: 'Wildlife Photography Safari',
    image: 'https://images.unsplash.com/photo173114600638428bfdf339b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    duration: '6 Days / 5 Nights',
    groupSize: '24 People',
    rating: 4.9,
    reviews: 82,
    price: '$3,200',
    features: [
      'Golden hour game drives',
      'Professional photography guide',
      'Prime wildlife locations',
      'Extended game drive times',
      'Photo editing workshops',
      'Small group guarantee',
    ],
    badge: 'Specialized',
  },
  {
    title: 'Maasai Cultural Experience',
    image: 'https://images.unsplash.com/photo1714327677109ebb5595fef47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxNYWFzYWklMjBwZW9wbGUlMjBjdWx0dXJlJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb4.1.0&q=80&w=1080',
    duration: '5 Days / 4 Nights',
    groupSize: '210 People',
    rating: 4.7,
    reviews: 68,
    price: '$1,650',
    features: [
      'Visit authentic Maasai villages',
      'Traditional dance ceremonies',
      'Learn beadwork and crafts',
      'Wildlife viewing in Ngorongoro',
      'Cultural immersion activities',
      'Local guide & translator',
    ],
    badge: 'Cultural',
  },
  {
    title: 'Family Safari Adventure',
    image: 'https://images.unsplash.com/photo1707419252416f6dacd82735d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    duration: '6 Days / 5 Nights',
    groupSize: 'Families',
    rating: 4.8,
    reviews: 103,
    price: '$2,400',
    features: [
      'Childfriendly accommodations',
      'Flexible game drive schedules',
      'Educational wildlife programs',
      'Swimming pool lodges',
      'Family suite options',
      'Kidapproved meals',
    ],
    badge: 'Family Friendly',
  },
];

export function SafariToursSection() {
  return (
    <section id="tours" className="py-24 bg-[#1A1208]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-[#e8d4b8]">
            Safari Tours & Packages
          </h2>
          <p className="text-xl text-[#d4a574] max-w-3xl mx-auto">
            Carefully crafted experiences designed to create memories that last a lifetime
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {safariPackages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#2C1810] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-72 overflow-hidden">
                <ImageWithFallback
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208] via-[#1A1208]/50 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#d4a574] text-[#1e1e22] px-4 py-2 rounded-full text-sm">
                  {pkg.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl text-[#e8d4b8] mb-2">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-[#d4a574]">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-[#d4a574] text-[#d4a574]" />
                    <span className="text-[#e8d4b8]">{pkg.rating}</span>
                    <span className="text-[#8b6f47] text-sm">({pkg.reviews} reviews)</span>
                  </div>
                  <div className="text-3xl text-[#d4a574]">
                    {pkg.price}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
                      <span className="text-[#e8d4b8]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-[#d4a574] hover:bg-[#c49563] text-[#1e1e22] py-3 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                  <button className="border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#1e1e22] py-3 rounded-lg transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-[#d4a574] mb-6">
            Can't find what you're looking for? We create custom safari experiences tailored to your dreams
          </p>
          <button className="bg-transparent border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#1e1e22] px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
            Build Your Custom Safari
          </button>
        </motion.div>
      </div>
    </section>
  );
}
