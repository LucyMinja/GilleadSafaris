import { Award, Heart, Leaf, Users } from 'lucide-react';

export const values = [
  {
    icon: <Heart size={22} strokeWidth={1.5} />,
    title: 'Genuine Care',
    desc: 'Every itinerary is crafted with personal attention. We listen first and design second - your trip is never a template.',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&h=700&fit=crop&auto=format',
  },
  {
    icon: <Leaf size={22} strokeWidth={1.5} />,
    title: 'Conservation First',
    desc: "A portion of every booking supports Tanzania's anti-poaching rangers, community schools, and habitat restoration projects.",
    img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=900&h=700&fit=crop&auto=format',
  },
  {
    icon: <Award size={22} strokeWidth={1.5} />,
    title: 'Uncompromising Quality',
    desc: 'We handpick every lodge, driver, and guide. If we would not stay there ourselves, we will not recommend it to you.',
    img: 'https://images.unsplash.com/photo-1595652974621-4a7a0b2caa14?w=900&h=700&fit=crop&auto=format',
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: 'Community Benefit',
    desc: 'We partner only with local guides, community-owned camps, and villages that choose authentic cultural exchange.',
    img: 'https://images.unsplash.com/photo-1580689402180-61f1ab9d6232?w=900&h=700&fit=crop&auto=format',
  },
];

export const team = [
  {
    name: 'Nicanory Erasto',
    role: 'Reservation Manager',
    bio: 'Nicanory oversees bookings and logistics for every safari, making sure vehicles, lodges, and permits are confirmed and ready well ahead of your arrival in Tanzania.',
    img: '/images/team/nic.png',
  },
  {
    name: 'Dr. Rose Mongi',
    role: 'Team Leader',
    bio: 'Rose leads the Gillead Safaris team, coordinating guides and office staff to keep every itinerary running smoothly from the moment you land to the moment you depart.',
    img: '/images/team/rose.png',
  },
  {
    name: 'Victor Mosses',
    role: 'Customer Consultant',
    bio: 'Victor works directly with guests to understand what they want from their trip, answering questions and tailoring each safari itinerary to their interests and budget.',
    img: '/images/team/vic.png',
  },
  {
    name: 'Faith',
    role: 'Sales and Marketing',
    bio: 'Faith is often the first point of contact for new guests, helping you explore our safari packages and find the right fit for your Tanzania adventure.',
    img: '/images/team/faith.png',
  },
];

export const stats = [
  { value: '6+', label: 'Years operating' },
  { value: '4', label: 'Team members' },
  { value: '10', label: 'Safari packages' },
  { value: '2020', label: 'Established' },
];
