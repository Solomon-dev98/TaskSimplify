import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp('postgres://postgres:Sustainpedal1%40@localhost:5432/TaskSimplify');

export default db;
