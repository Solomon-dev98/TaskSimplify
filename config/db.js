import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();
const db = pgp( process.env.DATABASE_URL || 'postgres://postgres:Sustainpedal1%40@localhost:5432/TaskSimplify');

export default db;
