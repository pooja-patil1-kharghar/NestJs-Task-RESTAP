Clean NestJS Task API
=====================

Features:
- MySQL + TypeORM (database: taskdb)
- REST + GraphQL (shared service)
- Swagger at /api
- Global ValidationPipe and Global HTTP Exception Filter
- Jest unit tests

How to run:
1. npm install
2. Create MySQL DB: CREATE DATABASE taskdb;
3. Edit .env if needed
4. npm run start:dev
5. Swagger: http://localhost:3000/api
6. Tests: npm test

migrations

1>data-source.ts should be at project root.

2.  changes in app.module.ts 

3. 1.include this in package.json
    // === TypeORM Migration Scripts ===
  "migration:generate": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d ./data-source.ts",
  "migration:run": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./data-source.ts",
  "migration:revert": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -d ./data-source.ts"

4.How to use these scripts

  1.Generate a new migration

   2.npm run migration:generate -- InitialMigration
       This will create a migration file in src/migrations.

        Name your migration as you like after --
        
        Run migrations

        npm run migration:run


Applies all pending migrations to the database.

Revert last migration (if needed)

npm run migration:revert


Rolls back the last applied migration.



