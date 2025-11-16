// ملف لاختبار الاتصال بقاعدة البيانات بشكل منفصل
require('dotenv').config();
const { sequelize, testConnection } = require('./config/database');

async function test() {
  console.log('🧪 Testing database connection...\n');
  console.log('Configuration:');
  console.log(`  Host: ${sequelize.config.host}`);
  console.log(`  Port: ${sequelize.config.port}`);
  console.log(`  Database: ${sequelize.config.database}`);
  console.log(`  Username: ${sequelize.config.username}\n`);
  
  try {
    await testConnection();
    console.log('\n✅ Connection test successful!');
    
    // محاولة استعلام بسيط
    const [results] = await sequelize.query('SELECT 1 as test');
    console.log('✅ Query test successful:', results);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection test failed!');
    console.error('\nFull error details:');
    console.error(error);
    process.exit(1);
  }
}

test();

