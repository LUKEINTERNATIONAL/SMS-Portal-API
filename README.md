# SMS-Portal-API
an Express JS Api

# How to seed your database (mysql)
1. create db name `eidsr_sms_portal`

2. cd `seeders`

3. run command `node index.js`

# Then also need to run migrations
1. `npx sequelize-cli db:migrate`

"this will populate your db instance"
             
             OR
    while in the root project dir,run command `npm run seed`
# use `npm start` to run the server while in root dir