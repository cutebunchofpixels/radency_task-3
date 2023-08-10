import 'dotenv/config';
import { initializeDataSource } from './src/database/initializeDataSource';

const dataSource = initializeDataSource('migrate');
export { dataSource };
