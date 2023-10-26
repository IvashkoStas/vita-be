import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUserFavorites = async (userId: string) => {
  await prisma.favorites.create({
    data: {
      userId,
    },
  });

  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      favorites: true,
    },
  });
};

const createUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'stas33',
    },
  });
  return user.id;
};

const addVitaminToFavorites = async (
  favoritesId: number,
  vitaminId: number,
) => {
  return await prisma.favorites.update({
    where: { id: favoritesId },
    data: {
      vitamins: {
        connect: {
          id: vitaminId,
        },
      },
    },
    include: {
      vitamins: {
        include: {
          combinations: true,
          conditions: true,
          norm: true,
        },
      },
    },
  });
};

export const seed = async () => {
  const userId = await createUser();
  const user = await createUserFavorites(userId);
  const vitaminId = 2;
  if (user?.favorites?.id) {
    const favorites = await addVitaminToFavorites(user.favorites.id, vitaminId);
    console.log('favorites: ', favorites);
  }
  const userWithFavorites = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      favorites: {
        include: {
          vitamins: {
            include: {
              combinations: true,
              conditions: true,
              norm: true,
            },
          },
        },
      },
    },
  });

  console.dir(userWithFavorites, { depth: null });
};
