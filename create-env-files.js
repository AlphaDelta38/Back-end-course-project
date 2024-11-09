const fs = require('fs');

const developmentEnvContent = `
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=HospitalDB
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432

ADMIN_ROLE=admin
ADMIN_FIRST_NAME=Super
ADMIN_LAST_NAME=Admin
ADMIN_DATE_OF_BIRTH=1980-01-01
ADMIN_GENDER=M
ADMIN_EMAIL=admin@clinic.com
ADMIN_PASSWORD=root

SECRET_KEY=secret_key
`;

const productionEnvContent = `
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=HospitalDB
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432

ADMIN_ROLE=admin
ADMIN_FIRST_NAME=Super
ADMIN_LAST_NAME=Admin
ADMIN_DATE_OF_BIRTH=1980-01-01
ADMIN_GENDER=M
ADMIN_EMAIL=admin@clinic.com
ADMIN_PASSWORD=root

SECRET_KEY=secret_key
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
