// Jalankan sekali: node src/seed.js
// Mengisi database dengan data course (dipindah dari hardcode frontend),
// modul asli per course, dan 1 akun admin default.

const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const Course = require('./models/Course');
const Module = require('./models/Module');
const User = require('./models/User');

const COURSES = [
  {
    title: "Full Stack Web Development with React & Node.js",
    description: "Kuasai React, Node.js, dan MongoDB untuk membangun aplikasi web full-stack modern dari nol hingga deployment. Materi mencakup REST API, autentikasi JWT, dan deployment ke cloud.",
    instructor: "Revo Fallentino", rating: 4.9, students: 7821, duration: "12 Weeks",
    level: "Intermediate", thumbnail: "https://picsum.photos/id/1015/400/250", price: 9.99,
    category: "web", xp: 500,
    topics: ["React Hooks", "Node.js & Express", "MongoDB", "JWT Auth", "REST API", "Deployment"],
  },
  {
    title: "UI/UX Design Masterclass using Figma",
    description: "Pelajari prinsip desain UI/UX profesional menggunakan Figma, dari wireframe hingga prototype interaktif. Termasuk user research, design system, dan handoff ke developer.",
    instructor: "Rifda Aziza", rating: 4.8, students: 5342, duration: "8 Weeks",
    level: "Beginner", thumbnail: "https://picsum.photos/id/201/400/250", price: 19.99,
    category: "design", xp: 350,
    topics: ["Design Thinking", "Wireframing", "Prototyping", "Design System", "User Testing"],
  },
  {
    title: "Digital Marketing Strategy & Growth Hacking 2026",
    description: "Strategi pemasaran digital terkini, SEO, social media marketing, dan growth hacking untuk bisnis modern. Belajar dari studi kasus nyata brand-brand ternama.",
    instructor: "Mujiyanto", rating: 4.7, students: 4201, duration: "6 Weeks",
    level: "Beginner", thumbnail: "https://picsum.photos/id/237/400/250", price: 14.99,
    category: "marketing", xp: 280,
    topics: ["SEO", "Social Media", "Email Marketing", "Analytics", "Growth Hacking"],
  },
  {
    title: "Python for Data Science & Machine Learning",
    description: "Menguasai Python, NumPy, Pandas, Matplotlib, dan Scikit-Learn untuk analisis data dan machine learning. Termasuk proyek klasifikasi, regresi, dan clustering.",
    instructor: "Yudha Riwanto", rating: 4.9, students: 9102, duration: "14 Weeks",
    level: "Intermediate", thumbnail: "https://picsum.photos/id/180/400/250", price: 24.99,
    category: "programming", xp: 650,
    topics: ["Python Basics", "NumPy & Pandas", "Data Visualization", "Machine Learning", "Deep Learning"],
  },
  {
    title: "Graphic Design for Beginners to Professional",
    description: "Mulai dari nol hingga profesional dalam desain grafis menggunakan Photoshop, Illustrator, dan Canva. Cocok untuk yang ingin berkarier di dunia kreatif.",
    instructor: "Hastari Utama", rating: 4.6, students: 3891, duration: "10 Weeks",
    level: "Beginner", thumbnail: "https://picsum.photos/id/133/400/250", price: 8.99,
    category: "design", xp: 420,
    topics: ["Photoshop", "Illustrator", "Canva", "Typography", "Color Theory", "Brand Identity"],
  },
  {
    title: "Mobile App Development with Flutter",
    description: "Bangun aplikasi mobile cross-platform Android dan iOS menggunakan Flutter dan Dart dari dasar. Termasuk state management, API integration, dan publish ke Play Store.",
    instructor: "Revo Fallentino", rating: 4.8, students: 6231, duration: "11 Weeks",
    level: "Intermediate", thumbnail: "https://picsum.photos/id/251/400/250", price: 22.99,
    category: "web", xp: 550,
    topics: ["Dart", "Flutter Widgets", "State Management", "REST API", "Firebase", "Publishing"],
  },
  {
    title: "Business English Communication Mastery",
    description: "Tingkatkan kemampuan komunikasi bisnis dalam bahasa Inggris untuk presentasi, email, dan meeting profesional. Termasuk latihan public speaking dan writing.",
    instructor: "Rifda Aziza", rating: 4.5, students: 2341, duration: "6 Weeks",
    level: "Beginner", thumbnail: "https://picsum.photos/id/316/400/250", price: 11.99,
    category: "marketing", xp: 200,
    topics: ["Business Writing", "Presentation", "Meeting Skills", "Negotiation", "Email Etiquette"],
  },
  {
    title: "Financial Literacy & Investment Fundamentals",
    description: "Pahami dasar-dasar keuangan pribadi, investasi saham, reksa dana, dan crypto untuk masa depan finansial yang lebih baik.",
    instructor: "Mujiyanto", rating: 4.7, students: 5109, duration: "7 Weeks",
    level: "Beginner", thumbnail: "https://picsum.photos/id/342/400/250", price: 13.99,
    category: "programming", xp: 300,
    topics: ["Budgeting", "Stock Market", "Reksa Dana", "Crypto Basics", "Portfolio Management"],
  },
  {
    title: "Content Creation & YouTube Growth Strategy",
    description: "Pelajari cara membuat konten viral, teknik editing video, strategi pertumbuhan channel YouTube dan monetisasi konten secara profesional.",
    instructor: "Hastari Utama", rating: 4.6, students: 4782, duration: "8 Weeks",
    level: "Beginner", thumbnail: "https://picsum.photos/id/367/400/250", price: 17.99,
    category: "marketing", xp: 320,
    topics: ["Video Production", "Editing", "SEO YouTube", "Monetization", "Branding"],
  },
  {
    title: "Cyber Security for Beginners",
    description: "Memahami ancaman keamanan siber, teknik ethical hacking, dan cara melindungi sistem jaringan dari berbagai serangan siber modern.",
    instructor: "Yudha Riwanto", rating: 4.8, students: 7340, duration: "9 Weeks",
    level: "Intermediate", thumbnail: "https://picsum.photos/id/188/400/250", price: 29.99,
    category: "programming", xp: 480,
    topics: ["Network Security", "Ethical Hacking", "Penetration Testing", "Cryptography", "OWASP"],
  },
  {
    title: "Laravel 11 Backend Development",
    description: "Kuasai Laravel 11 untuk membangun REST API, sistem autentikasi, dan aplikasi web backend yang handal dan scalable untuk production.",
    instructor: "Revo Fallentino", rating: 4.9, students: 6890, duration: "10 Weeks",
    level: "Advanced", thumbnail: "https://picsum.photos/id/160/400/250", price: 21.99,
    category: "web", xp: 600,
    topics: ["Laravel Routing", "Eloquent ORM", "REST API", "Sanctum Auth", "Queue & Jobs", "Testing"],
  },
  {
    title: "3D Animation with Blender",
    description: "Belajar modeling, rigging, animasi, dan rendering 3D profesional menggunakan Blender dari nol. Termasuk simulasi fisika dan visual effects.",
    instructor: "Rifda Aziza", rating: 4.5, students: 2901, duration: "13 Weeks",
    level: "Advanced", thumbnail: "https://picsum.photos/id/473/400/250", price: 26.99,
    category: "design", xp: 700,
    topics: ["3D Modeling", "Rigging", "Animation", "Rendering", "VFX", "Compositing"],
  },
];

function buildModulesFor(course) {
  return course.topics.map((topic, i) => ({
    order: i + 1,
    title: `Modul ${i + 1}: ${topic}`,
    duration: `${10 + i * 3} menit`,
    type: 'article',
    isFree: i < 3,
    content:
      `# ${topic}\n\n` +
      `Materi ini membahas **${topic}** sebagai bagian dari kursus "${course.title}".\n\n` +
      `Konten ini masih placeholder — silakan edit lewat Admin Dashboard untuk menambahkan ` +
      `penjelasan, contoh kode, gambar, atau link video sesuai kebutuhan materi ${topic}.`,
  }));
}

async function seed() {
  try {
    await sequelize.sync({ alter: true });
    console.log('DB synced.');

    const existing = await Course.count();
    if (existing > 0) {
      console.log(`Sudah ada ${existing} course di database. Seed dibatalkan (biar tidak duplikat).`);
      console.log('Kalau mau seed ulang dari nol, hapus dulu semua data course & modul di database.');
      process.exit(0);
    }

    for (const c of COURSES) {
      const course = await Course.create(c);
      const modules = buildModulesFor(c).map((m) => ({ ...m, courseId: course.id }));
      await Module.bulkCreate(modules);
      console.log(`Seeded: ${course.title} (${modules.length} modul)`);
    }

    const adminEmail = 'admin@skillflow.com';
    const adminExists = await User.findOne({ where: { email: adminEmail } });
    if (!adminExists) {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin SkillFlow',
        email: adminEmail,
        password: hashed,
        role: 'admin',
      });
      console.log(`Akun admin dibuat -> email: ${adminEmail} | password: admin123`);
      console.log('PENTING: ganti password ini setelah login pertama kali!');
    } else {
      console.log('Akun admin sudah ada, dilewati.');
    }

    console.log('Seeding selesai.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding gagal:', err);
    process.exit(1);
  }
}

seed();