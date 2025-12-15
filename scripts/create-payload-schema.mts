import { config } from 'node:process';
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
    // 移除引号
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) {
      process.env[key] = value;
    }
  }
}

const { Pool } = pg;

async function createPayloadSchema() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query('CREATE SCHEMA IF NOT EXISTS payload');
    console.log('✅ Payload schema created successfully');
  } catch (error) {
    console.error('❌ Error creating schema:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createPayloadSchema();
