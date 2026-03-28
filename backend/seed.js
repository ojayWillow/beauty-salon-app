/**
 * Seed script — populate DB with sample products & services
 * Usage: cd backend && node seed.js
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const Product = require('./src/models/Product');
const Service = require('./src/models/Service');

const products = [
  { name: 'Rose Glow Serum', description: 'Brightening vitamin C serum with rose extract.', price: 34.99, category: 'skincare', stock: 50 },
  { name: 'Hydra-Boost Moisturiser', description: 'Deep hydration cream for all skin types.', price: 24.99, category: 'skincare', stock: 40 },
  { name: 'Silk Touch Foundation', description: 'Buildable coverage with a satin finish.', price: 29.99, category: 'makeup', stock: 30 },
  { name: 'Velvet Lip Colour', description: 'Long-lasting matte lip colour in 12 shades.', price: 14.99, category: 'makeup', stock: 60 },
  { name: 'Nourish & Shine Shampoo', description: 'Sulphate-free shampoo for colour-treated hair.', price: 19.99, category: 'haircare', stock: 35 },
  { name: 'Argan Oil Hair Mask', description: 'Intensive repair mask for damaged hair.', price: 22.99, category: 'haircare', stock: 25 },
  { name: 'Gel Nail Kit', description: 'Professional gel nail kit — 12 colours included.', price: 39.99, category: 'nails', stock: 20 },
  { name: 'Cuticle Oil Pen', description: 'Nourishing cuticle oil with vitamin E.', price: 9.99, category: 'nails', stock: 80 },
];

const services = [
  { name: 'Classic Manicure', description: 'Shape, buff, and polish for perfectly groomed nails.', price: 25, duration: 45 },
  { name: 'Gel Manicure', description: 'Long-lasting gel polish with chip-free finish for up to 3 weeks.', price: 40, duration: 60 },
  { name: 'Luxury Facial', description: 'Cleanse, exfoliate, and hydrate for glowing skin.', price: 65, duration: 75 },
  { name: 'Classic Pedicure', description: 'Soak, scrub, and polish for beautiful feet.', price: 35, duration: 60 },
  { name: 'Eyebrow Shaping', description: 'Precision threading or waxing for defined brows.', price: 18, duration: 20 },
  { name: 'Full Body Wax', description: 'Professional waxing for smooth, long-lasting results.', price: 80, duration: 90 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
  await Product.deleteMany();
  await Service.deleteMany();
  await Product.insertMany(products);
  await Service.insertMany(services);
  console.log(`✅ Seeded ${products.length} products and ${services.length} services.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
