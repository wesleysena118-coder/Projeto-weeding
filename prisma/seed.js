const { PrismaClient, UserRole } = require('@prisma/client');
const bcrypt = require('bcryptjs');
 
const prisma = new PrismaClient();
 
async function main() {
  await prisma.guest.deleteMany();
  await prisma.user.deleteMany();
 
  const passwordHash = await bcrypt.hash('123456', 10);
 
  await prisma.user.createMany({
    data: [
      {
        name: 'Administrador Master',
        cpf: '000.000.000-00',
        email: 'admin@email.com',
        password: passwordHash,
        role: UserRole.ADMIN
      },
      {
        name: 'Recepcionista',
        cpf: '111.111.111-11',
        email: 'recepcionista@email.com',
        password: passwordHash,
        role: UserRole.STAFF
      }
    ]
  });
 
  await prisma.guest.createMany({
    data: [
      {
        name: 'Luiz Eduardo',
        surname: 'Alves',
        cpf: '222.111.000-01',
        phone: '(51) 99999-0001',
        email: 'luizeduardo@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Rafael',
        surname: 'Ribeiro',
        cpf: '222.111.000-02',
        phone: '(51) 99999-0002',
        email: 'rafael@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Wesley',
        surname: 'Snipes',
        cpf: '222.111.000-03',
        phone: '(51) 99999-0003',
        email: 'wesley@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Gabriel',
        surname: 'Hostins',
        cpf: '222.111.000-04',
        phone: '(51) 99999-0004',
        email: 'gabriel@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Rodrigo',
        surname: 'Pereira',
        cpf: '222.111.000-05',
        phone: '(51) 99999-0005',
        email: 'rodrigo@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Bernardo',
        surname: 'Kraus',
        cpf: '222.111.000-06',
        phone: '(51) 99999-0006',
        email: 'bernardo@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Pedro',
        surname: 'Couto',
        cpf: '222.111.000-07',
        phone: '(51) 99999-0007',
        email: 'pedro@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Anderson',
        surname: 'Malta',
        cpf: '222.111.000-08',
        phone: '(51) 99999-0008',
        email: 'malta@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Ryan',
        surname: 'Aliardi',
        cpf: '222.111.000-09',
        phone: '(51) 99999-0009',
        email: 'ryan@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
      {
        name: 'Arthur',
        surname: 'Mello',
        cpf: '222.111.000-10',
        phone: '(51) 99999-0010',
        email: 'ryan@email.com',
        tableNumber: 1,
        checkedIn: false,
        checkinAt: null
      },
    ]
  });
 
  console.log('Seed executado com sucesso.');
}
 
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
