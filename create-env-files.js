const fs = require('fs');

const developmentEnvContent = `
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=HospitalDB
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432

SECRET_KEY=secret_key_dada
CLIENT_APP_URL=http://localhost:3000
`;

const productionEnvContent = `
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=HospitalDB
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432

SECRET_KEY=secret_key_dada
CLIENT_APP_URL=http://localhost:3000
`;

if (!fs.existsSync('.development.env')) {
  fs.writeFileSync('.development.env', developmentEnvContent.trim());
  console.log('.development.env file created');
} else {
  console.log('.development.env already exists');
}

if (!fs.existsSync('.production.env')) {
  fs.writeFileSync('.production.env', productionEnvContent.trim());
  console.log('.production.env file created');
} else {
  console.log('.production.env already exists');
}
