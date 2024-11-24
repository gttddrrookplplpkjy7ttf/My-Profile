const express = require('express');
const { readdirSync } = require('fs');

const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')

const app = express();
connectDB()


app.use(morgan('dev'))

app.use(bodyParse.json({ limit: '10mb' }));

const corsOptions = {
    origin: 'http://localhost:3001', // หรือที่อยู่ของ React
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // กำหนด HTTP Methods ที่อนุญาต
    allowedHeaders: ['Content-Type', 'Authorization'] // กำหนด Headers ที่อนุญาต
};
app.use(cors(corsOptions)); // ใช้ middleware cors


readdirSync('./Routes/').map((a) => {
    app.use('/api', require('./Routes/' + a))
});

app.listen(3000, () =>{
    console.log("Server Running on port 3000");
}) 
