import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: '61UOUTaCOWqGSqD+clum'  // Replace with your actual password
  },
  ssl: {
    rejectUnauthorized: false  // Accept self-signed certs; for production, use proper certs
  }
});

export default client;
