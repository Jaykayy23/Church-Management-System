const runMigrate = process.env.VERCEL_ENV === "production";
const migrateCommand = runMigrate ? "prisma migrate deploy" : "echo Skipping prisma migrate deploy";

module.exports = {
  scripts: {
    dev: "next dev",
    build: `${migrateCommand} && next build`,
    postinstall: "prisma generate",
    start: "next start",
    lint: "eslint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
  },
};
