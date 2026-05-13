import { JSONFilePreset } from 'lowdb/node';

const defaultData = { produtos: [], funcionarios: [] };

const db = await JSONFilePreset('db.json', defaultData);

export default db;

