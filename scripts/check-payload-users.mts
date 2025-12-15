import pg from 'pg';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// 读取 .env 文件
const envPath = join(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n');
for (const line of envLines) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1]?.trim();
    let value = match[2]?.trim() || '';
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) {
      process.env[key] = value;
    }
  }
}

const { Pool } = pg;

async function checkUsers() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const result = await pool.query('SELECT id, email, name FROM payload.users');
    console.log('Payload users:', result.rows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

checkUsers();
