const pool = require('./db');

async function testDB() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('🕒 Heure PostgreSQL :', result.rows[0]);
  } catch (err) {
    console.error('❌ Requête échouée', err);
  }
}

testDB();
