import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const secret = crypto.randomBytes(64).toString('hex');
const secretFilePath = path.join(process.cwd(), '.env');

fs.appendFileSync(secretFilePath, `JWT_SECRET=${secret}\n`, 'utf8');

console.log(`Generated JWT_SECRET and saved to ${secretFilePath}`);