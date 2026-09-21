const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@potholeai.com';
  const password = 'AdminPassword123!';
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log(`Admin user ${email} already exists.`);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: email,
      passwordHash: passwordHash,
      role: 'ADMIN' // or 'AUTHORITY'
    }
  });

  console.log(`Created admin user: ${admin.email}`);
  
  const municipalEmail = 'municipal@potholeai.com';
  const existingMunicipal = await prisma.user.findUnique({
    where: { email: municipalEmail }
  });

  if (!existingMunicipal) {
    const municipal = await prisma.user.create({
      data: {
        name: 'Municipal Admin',
        email: municipalEmail,
        passwordHash: passwordHash,
        role: 'AUTHORITY' 
      }
    });
    console.log(`Created municipal admin user: ${municipal.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
