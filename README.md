## Labone Church of Christ Admin

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Update `.env.local`:
   - `AUTH_SECRET` (a strong random value)
   - `ADMIN_SETUP_KEY` (used once to initialize the database and create the first admin)
3. Run Prisma migrations + seed:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
4. Create the first admin user (one-time):
   ```bash
   curl -X POST http://localhost:3000/api/admin/create-admin \
     -H "x-admin-key: YOUR_ADMIN_SETUP_KEY" \
     -H "Content-Type: application/json" \
     -d '{"username":"labone-admin","password":"ChangeMe123!","name":"Admin"}'
   ```
5. Run the app:
   ```bash
   npm run dev
   ```

### Notes
- Prisma schema lives in `prisma/schema.prisma`, seed in `prisma/seed.js`.
- All data shown in the dashboard is loaded from Neon Postgres via Prisma.
