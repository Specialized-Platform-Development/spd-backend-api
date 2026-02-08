import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import connectDB from '../config/database.js';

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
    },
];

const products = [
    {
        name: 'Laptop Gaming Pro',
        description: 'Laptop gaming spesifikasi tinggi dengan prosesor terbaru dan kartu grafis RTX 4080. Cocok untuk gaming berat dan rendering video 4K.',
        price: 25000000,
        stock: 10,
        imageUrl: 'https://placehold.co/600x400/png?text=Laptop+Gaming',
    },
    {
        name: 'Smartphone Flagship X',
        description: 'Smartphone dengan kamera 200MP dan layar AMOLED 120Hz. Performa kencang dengan chipset Snapdragon 8 Gen 3.',
        price: 15000000,
        stock: 25,
        imageUrl: 'https://placehold.co/600x400/png?text=Smartphone',
    },
    {
        name: 'Headphone Noise Cancelling',
        description: 'Headphone nirkabel dengan fitur active noise cancelling terbaik di kelasnya. Baterai tahan lama hingga 30 jam.',
        price: 3500000,
        stock: 50,
        imageUrl: 'https://placehold.co/600x400/png?text=Headphone',
    },
    {
        name: 'Smartwatch Series 5',
        description: 'Jam tangan pintar dengan fitur pemantau kesehatan lengkap, termasuk EKG dan oksigen darah. Tahan air hingga 50 meter.',
        price: 4500000,
        stock: 30,
        imageUrl: 'https://placehold.co/600x400/png?text=Smartwatch',
    },
    {
        name: 'Tablet Pro 12.9"',
        description: 'Tablet layar besar dengan performa setara laptop. Mendukung stylus dan keyboard untuk produktivitas maksimal.',
        price: 18000000,
        stock: 15,
        imageUrl: 'https://placehold.co/600x400/png?text=Tablet',
    },
    {
        name: 'Kamera Mirrorless 4K',
        description: 'Kamera mirrorless compact dengan kemampuan rekam video 4K 60fps. Autofokus cepat dan akurat.',
        price: 12000000,
        stock: 8,
        imageUrl: 'https://placehold.co/600x400/png?text=Kamera',
    },
];

const seedDatabase = async (shouldExit = true) => {
    try {
        await connectDB();

        // Check if data already exists to avoid duplicate seeding on restart
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();

        if (userCount > 0 && productCount > 0) {
            console.log('✅ Database already seeded. Skipping...');
            return;
        }

        console.log('🗑️  Clearing database...');
        await User.deleteMany();
        await Product.deleteMany();

        console.log('🌱 Seeding Users...');
        const createdUsers = await User.create(users);
        console.log(`✅ ${createdUsers.length} users created`);

        console.log('🌱 Seeding Products...');
        const createdProducts = await Product.create(products);
        console.log(`✅ ${createdProducts.length} products created`);

        console.log('🎉 Data seeding completed successfully!');
        if (shouldExit) process.exit();
    } catch (error) {
        console.error(`❌ Error seeding data: ${error.message}`);
        if (shouldExit) process.exit(1);
    }
};

export default seedDatabase;
