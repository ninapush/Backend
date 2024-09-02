## Getting Started

This app was developed with Node Version 22.7.0 with NextJS Version 14.2.7
Have those install

```bash
nvm use 22.7.0
```

then install all node module 
```bash
npm install
```

Configuring the file .env.local 
PORT is 1984 by default but you can. if you do please config your frontend to be 1984
FRONTEND_URI is localhost:3000 by the default of nextjs, this will handle come cors issue. if it has been change please change according
JWT_SECRET was a random string, you are welcome to change
CONNECTION_STRING for mongoDB connection. I have left the string to my test environment that should be clean when you access. You can change to be your


```bash
PORT
FRONTEND_URI
CONNECTION_STRING
JWT_SECRET
```

when everything is config run the following command 

```bash
npm run dev
```
