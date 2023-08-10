npm run migrations:run -- -d ./ormconfig.ts
npm run seed -- ./src/database/seeders/category.seeder.ts
npm run seed -- ./src/database/seeders/note.seeder.ts

node ./dist/src/main.js