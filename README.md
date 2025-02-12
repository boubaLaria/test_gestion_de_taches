# Gestion Tâche

Ce projet est un projet [Next.js](https://nextjs.org) bootstrappé avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Mise en place du projet

### Cloner le dépôt

```bash
git clone git@github.com:boubaLaria/test_gestion_de_taches.git
cd gestion_tache
```

### Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

Vous pouvez commencer à éditer la page en modifiant `app/page.tsx`. La page se met à jour automatiquement lorsque vous éditez le fichier.

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour optimiser et charger automatiquement [Geist](https://vercel.com/font), une nouvelle famille de polices pour Vercel.

## Configuration de Prisma

### Schéma Prisma

Voici le schéma Prisma utilisé dans ce projet :

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Users {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  tasks     Task[]
}

model Task {
  id        Int      @id @default(autoincrement())
  name      String
  status    String
  userId    Int?
  user      Users?   @relation(fields: [userId], references: [id])
}
```

### Mettre à jour la base de données

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Ajouter la variable d'environnement

Ajoutez la ligne suivante dans votre fichier `.env` :

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Remplacez `USER`, `PASSWORD`, `HOST`, `PORT` et `DATABASE` par les informations de votre base de données.

## Vidéo de présentation

Voici une vidéo de présentation du projet :

<video width="600" controls>
  <source src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="video/mp4">
  Your browser does not support the video tag.
</video>

Vous pouvez également visionner la vidéo de présentation sur [YouTube](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

## En savoir plus

Pour en savoir plus sur Next.js, consultez les ressources suivantes :

- [Documentation Next.js](https://nextjs.org/docs) - apprenez-en plus sur les fonctionnalités et l'API de Next.js.
- [Apprendre Next.js](https://nextjs.org/learn) - un tutoriel interactif Next.js.

Vous pouvez consulter [le dépôt GitHub de Next.js](https://github.com/vercel/next.js) - vos retours et contributions sont les bienvenus !

## Déployer sur Vercel

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js.

Consultez notre [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.
