## Short Description of The Project
Sangam is a social media website which allows user to signup and post about the latest happenings in their life and in the world, be it posting links, images or texts. Users can also like and comment on the posts. An email verification and forgotPassword system has also been built. People can search for users and chat with them. Users can also customize their profiles.

# Project SetUp
- Clone the repo
- Navigate to directory sangam
- Run the following command
``` shell
npm install
```

- Create a .env file with the following variables
``` .env
MONGO_URI="..."
SEND_EMAIL_PASSWORD="...."
EMAIL="..."
DOMAIN=http://localhost:3000
JWT_SECRET="..."
```
- EMAIL variable in .env file is the email using which verification email will be sent.
- SEND_EMAIL_PASSWORD should be obtained by going to security of the google account (whose email is being used to send verification email), turn on two step verification, under two step verification go to App Passwords and generate a new password, the string generated will be the value (put without spaces) of SEND_EMAIL_PASSWORD in .env file

- Then run the following command in terminal
```shell
npm run dev
```