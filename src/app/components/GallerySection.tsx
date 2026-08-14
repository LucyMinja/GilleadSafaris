'use client';

import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { Camera, Heart, Share2 } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo1593698112819077eb8db9790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Zebras in the wild',
    likes: 245,
  },
  {
    url: 'https://images.unsplash.com/photo1765706729982e5475767c4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Close encounter with giraffe',
    likes: 312,
  },
  {
    url: 'https://images.unsplash.com/photo1693761668698438890471c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Elephants at sunset',
    likes: 428,
  },
  {
    url: 'https://images.unsplash.com/photo14967615238296ee70d7928aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxTZXJlbmdldGklMjB3aWxkZWJlZXN0JTIwbWlncmF0aW9ufGVufDF8fHx8MTc4MDg1NjQ3MHww&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'River crossing migration',
    likes: 567,
  },
  {
    url: 'https://images.unsplash.com/photo15863473780367a8c24975a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxaYW56aWJhciUyMGJlYWNoJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcwfDA&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Zanzibar beach paradise',
    likes: 389,
  },
  {
    url: 'https://images.unsplash.com/photo174185082148909bc4bce3960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYW56YW5pYSUyMGxhbmRzY2FwZSUyMHNhdmFubmElMjBzdW5zZXR8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Golden savanna sunset',
    likes: 492,
  },
  {
    url: 'https://images.unsplash.com/photo158068482875034199f28ef2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxNYWFzYWklMjBwZW9wbGUlMjBjdWx0dXJlJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Maasai warrior',
    likes: 334,
  },
  {
    url: 'https://images.unsplash.com/photo1545585043c061d1abaabd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxaYW56aWJhciUyMGJlYWNoJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcwfDA&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Traditional dhow boats',
    likes: 276,
  },
  {
    url: 'https://images.unsplash.com/photo1741850820078bd14aa710eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxUYW56YW5pYSUyMGxhbmRzY2FwZSUyMHNhdmFubmElMjBzdW5zZXR8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb4.1.0&q=80&w=1080',
    caption: 'Misty morning in Serengeti',
    likes: 418,
  },
];

export function GallerySection() {
  return (
    <section className="py-24 bg-[#1A1208]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="w-8 h-8 text-[#d4a574]" />
            <h2 className="text-5xl md:text-6xl text-[#e8d4b8]">
              Safari Gallery
            </h2>
          </div>
          <p className="text-xl text-[#d4a574] max-w-3xl mx-auto">
            Moments captured by our travelers  Your next adventure awaits
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{ height: index % 3 === 0 ? '400px' : index % 2 === 0 ? '350px' : '300px' }}
            >
              <ImageWithFallback
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#e8d4b8] text-lg mb-3">{image.caption}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-[#d4a574]">
                      <Heart className="w-5 h-5" />
                      <span>{image.likes}</span>
                    </div>
                    <button className="bg-[#d4a574]/20 hover:bg-[#d4a574]/40 backdrop-blur-sm p-2 rounded-full transition-colors">
                      <Share2 className="w-5 h-5 text-[#e8d4b8]" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-[#d4a574] text-[#1e1e22] px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-4 h-4 inline mr-1" />
                View
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
          <button className="bg-transparent border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#1e1e22] px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
            View Full Gallery
          </button>
        </motion.div>
      </div>
    </section>
  );
}
