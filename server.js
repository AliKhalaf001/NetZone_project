const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware لقراءة البيانات بصيغة JSON
app.use(express.json());

// ربط مجلد الواجهة الأمامية (public) لخدمة ملفات الـ HTML والـ JS
app.use(express.static(path.join(__dirname, 'public')));

// الاتصال بقاعدة بيانات MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// استيراد مسارات الـ API
const authRoutes = require('./routes/auth');
const packagesRoutes = require('./routes/packages');
const subscriptionsRoutes = require('./routes/subscriptions');

// استخدام المسارات
app.use('/api/auth', authRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);

// تشغيل السيرفر على البورت المحدد أو 5000 افتراضياً
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});