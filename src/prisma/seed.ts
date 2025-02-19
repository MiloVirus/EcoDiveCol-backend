import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const logro1 = await prisma.logros.create({
    data: {
      name: 'Limpieza de Playa',
      descripcion: 'Haz limpiado la playa local contribuyendo al sostenimiento ecológico, los peces, tortugas y aves de la zona están agradecidos contigo',
      imagen: 'https://www.imghippo.com/i/mtC2106oLo.webp',
      puntos: 50
    },
  });

  const logro2 = await prisma.logros.create({
    data: {
      name: 'Caza de pez León en el Caribe',
      descripcion: 'Descripción del logro 2',
      imagen: 'https://www.imghippo.com/i/VnS9805Fpo.png',
      puntos: 150
    },
  });

  const logro3 = await prisma.logros.create({
    data: {
      name: 'Corta una linea de pesca ilegal',
      descripcion: 'Descripción del logro 2',
      imagen: 'https://www.imghippo.com/i/QG8527UI.png',
      puntos: 100
    },
  });

  console.log('Logros creados exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
