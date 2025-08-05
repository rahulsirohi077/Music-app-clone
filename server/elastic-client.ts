import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: process.env.ELASTIC_PASS ?? (() => { throw new Error('ELASTIC_PASS environment variable is not set'); })()
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default client;
