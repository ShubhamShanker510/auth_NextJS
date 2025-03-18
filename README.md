## Auththentication in Next JS

# Step-1
## creating folder structure

    1. All the backend code is written into api folder as you can see in my folder structure thier is api folder than user folder and insider uder folder thier is signup and other folder to and inside than route fil to basically defines routes

    2. models, dbConfig, helpers folder is inside src folder and .env folder outside the src folder

# Step-2 
## Connecting Database
    1. Simply connecting database how we connected in express also

# Step-3
## Creating User model
    1. creating schema with all the required field in models folder

# Step-4
## Configure mail
    1. In helper folder thier is mail.ts file where all the steps were written to send the email
    2. for this we are using nodemailer 👉 https://www.nodemailer.com/ and mailtrap 👉 https://mailtrap.io/ for sending mails

# Step-5
## Creating signup api
    1. It is necessary to connectdb in every single routes as next js run on edgecases
    2. You can even use zod for pre validation
    3. Routes working 👉 /api/user/signup 

# Step-6
## Creating login,logout and verifyEmail
    1. Comparing token from email to the database and after verifying setup of verifytoken undefined
    2. In login accepting response from the bodu and finding user by email and creating token with the help of jwt sending it into cookie
    3. Clearing token in logout

# Step -7
## Create frontend
    1. login ,signup and verify email done