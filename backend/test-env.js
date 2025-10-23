require('dotenv').config();
console.log('Environment Variables:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`MONGO_URI: ${process.env.MONGO_URI ? '***' : 'Not set'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '***' : 'Not set'}`);
