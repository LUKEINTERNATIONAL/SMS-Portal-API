# SMS-Portal-API
an Express JS Api

# How to seed your database (mysql) and run the API
1. create db name `eidsr_sms_portal`
2. seed database `npm run seed`
3. run migrations `npx sequelize-cli db:migrate`
# use `npm start` to run the server while in root dir

other commands
`npx sequelize migration:generate --name Model`