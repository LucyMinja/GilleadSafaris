'use client';

import { motion } from 'motion/react';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const destinations = [
  {
    name: 'Serengeti National Park',
    image: 'https://images.unsplash.com/photo15641011605314838e8a5f4e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTZXJlbmdldGklMjB3aWxkZWJlZXN0JTIwbWlncmF0aW9ufGVufDF8fHx8MTc4MDg1NjQ3MHww&ixlib=rb4.1.0&q=80&w=1080',
    description: 'Home to the Great Migration and diverse wildlife',
    duration: '37 days',
    bestFor: 'Wildlife Photography',
    highlights: ['Big Five', 'Great Migration', 'Hot Air Balloon Safaris'],
  },
  {
    name: 'Mount Kilimanjaro',
    image: 'https://images.unsplash.com/photo159015924782850db87c9228e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxNb3VudCUyMEtpbGltYW5qYXJvJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDY5fDA&ixlib=rb4.1.0&q=80&w=1080',
    description: 'Africa\'s highest mountain at 5,895 meters',
    duration: '59 days',
    bestFor: 'Adventure Seekers',
    highlights: ['Uhuru Peak', 'Glaciers', 'Multiple Routes'],
  },
  {
    name: 'Zanzibar Island',
    image: 'https://images.unsplash.com/photo1646668352973989182f03091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxaYW56aWJhciUyMGJlYWNoJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcwfDA&ixlib=rb4.1.0&q=80&w=1080',
    description: 'Pristine beaches and spicescented air',
    duration: '35 days',
    bestFor: 'Beach Relaxation',
    highlights: ['Stone Town', 'Spice Tours', 'Diving & Snorkeling'],
  },
  {
    name: 'Ngorongoro Crater',
    image: 'https://images.unsplash.com/photo168746131370671c7229e21bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    description: 'World\'s largest inactive volcanic caldera',
    duration: '12 days',
    bestFor: 'Wildlife Viewing',
    highlights: ['Black Rhinos', 'Crater Floor', 'Maasai Villages'],
  },
  {
    name: 'Lake Manyara',
    image: 'https://images.unsplash.com/photo166629274995967143adb3caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    description: 'Famous for treeclimbing lions and flamingos',
    duration: '12 days',
    bestFor: 'Bird Watching',
    highlights: ['Treeclimbing Lions', 'Flamingos', 'Hot Springs'],
  },
  {
    name: 'Tarangire National Park',
    image: 'https://images.unsplash.com/photo173370594051287d66e3fcd9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    description: 'Elephant paradise with iconic baobab trees',
    duration: '23 days',
    bestFor: 'Elephant Viewing',
    highlights: ['Elephant Herds', 'Baobab Trees', 'River Wildlife'],
  },
];

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-24 bg-[#1A1208]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-[#e8d4b8]">
            Explore Tanzania's Wonders
          </h2>
          <p className="text-xl text-[#d4a574] max-w-3xl mx-auto">
            From the vast plains of Serengeti to the summit of Kilimanjaro, discover the most breathtaking destinations in East Africa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: 8 }}
              className="group bg-[#2C1810] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-[#d4a574] text-[#1e1e22] px-4 py-2 rounded-full text-sm">
                  {destination.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-5 h-5 text-[#d4a574]" />
                  <h3 className="text-2xl text-[#e8d4b8]">
                    {destination.name}
                  </h3>
                </div>

                <p className="text-[#d4a574] mb-4">
                  {destination.description}
                </p>

                <div className="flex items-center space-x-2 mb-4 text-sm text-[#8b6f47]">
                  <Users className="w-4 h-4" />
                  <span>Best for: {destination.bestFor}</span>
                </div>

                <div className="border-t border-[#8b6f47]/30 pt-4">
                  <p className="text-sm text-[#d4a574] mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-[#8b6f47]/20 text-[#e8d4b8] px-3 py-1 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-6 w-full bg-[#d4a574] hover:bg-[#c49563] text-[#1e1e22] py-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
