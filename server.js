const express = require('express');
const { readdirSync } = require('fs');
const path = require('path')
const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')
const http = require("http")
const mqtt = require('mqtt');

const app = express();
connectDB();

const REST_PORT = 3000;
const MQTT_BROKER_URL = 'mqtt://localhost:1883';


app.use(morgan('dev'))

app.use(bodyParse.json({ limit: '10mb' }));

const corsOptions = {
    origin: 'http://localhost:3000', // หรือที่อยู่ที่ frontend รันอยู่
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
 };
  app.use(cors(corsOptions));

// เชื่อมต่อกับ MQTT Broker
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

// Subscribe ไปยัง topic 'message' เมื่อเชื่อมต่อ MQTT สำเร็จ
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('cpe406/project', (err) => {
        if (err) {
            console.log('Failed to subscribe:', err);
        } else {
            console.log('Subscribed to topic: cpe406/project');
        }
    });
});

// เมื่อได้รับข้อความจาก MQTT
mqttClient.on('cpe406/project', async (topic, message) => {
    const data = message.toString();
    console.log(`Received message from ${topic}: ${data}`);

    io.emit('mqtt_data', data);
});


readdirSync('./Routes/').map((a) => {
    app.use('/api', require('./Routes/' + a))
});

app.listen(3000, () =>{
    console.log("Server Running on port 3000");
}) 
