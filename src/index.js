require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import {
    graphiqlExpress,
    graphqlExpress
} from 'apollo-server-express';
import {
    makeExecutableSchema
} from 'graphql-tools';
import cors from 'cors';
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const app = express();
const indexSchema = require('./graphql/GraphQL-index').indexSchema;

//setting
app.set('port', process.env.PORT || 4000);

//DB connect
if (process.env.STATUS == 'development') {
    mongoose.connect(process.env.DB || 'mongodb://localhost/fiture-ecommerce')
        .then(() => console.log('mongodb connected'))
        .catch(err => console.log(err));

    var corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200 // accept cors from local only
    }
} else {
    mongoose.connect(process.env.DB || 'mongodb://103.82.241.18/fiture-ecommerce', {
            user: process.env.DB_USER || 'fitureMONGO',
            pass: process.env.DB_PASS || 'fiture123$#',
            auth: {
                authdb: 'admin'
            }
        })
        .then(() => console.log('mongodb connected'))
        .catch(err => console.log(err));

    var corsOptions = {
        origin: 'http://103.82.241.18',
        optionsSuccessStatus: 200 // accept connection from 103.82.241.18 only
    }
}

//Generate token
// var asd = jsonwebtoken.sign({
//     exp: Math.floor(Date.now() / 1000) + 1000,
//     status: true
//     }, 'secretkey');
// console.log(asd);

// var qwe = jsonwebtoken.verify(asd, 'secretkey', function(err, decoded) {
//     if(err){
//         console.log('error decode');
//     }else{
//         console.log('success decode');
//     }
// });

//Middleware routes

//Routes
app.use('/graphql',
    jwt({
        secret: process.env.SECRET_KEY || 'asdasd',
        credentialsRequired: false
    }),
    function (err, req, res, next) {
        if (err) {
            res.sendStatus(403);
        } else {
            next();
        }
    },
    cors(),
    express.json(),
    graphqlExpress({
        schema: indexSchema
    })
);

app.use('/graphiql', cors(), graphiqlExpress({
    endpointURL: '/graphql'
}));

//start server
app.listen(app.get('port'), () => {
    console.log('Server on "' + process.env.STATUS + '" running on PORT ' + process.env.PORT || '4000');
});