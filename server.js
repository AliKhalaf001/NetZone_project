const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// الاتصال بقاعدة البيانات بدون خيارات قديمة غير مدعومة
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// استيراد المسارات
const authRoutes = require('./routes/auth');
const packagesRoutes = require('./routes/packages');
const subscriptionsRoutes = require('./routes/subscriptions');
const adminRoutes = require('./routes/admin'); // 👈 مسارات لوحة التحكم الإدارية

// تسجيل المسارات
app.use('/api/auth', authRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/admin', adminRoutes); // 👈 تفعيل مسار الأدمن

// Catch-all للملف الرئيسي
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});