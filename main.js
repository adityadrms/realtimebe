const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middleware/error.middleware.js");
const publicRouter = require("./routes/public.routes.js");
const privateRouter = require("./routes/private.routes.js");
const {sendMessageAndSaveToDB} = require("./Kafka/kafkaProducer");
const { runKafkaConsumer } = require("./Kafka/kafka.konsumer.js");
const  { startKafkaConsumerAndProcessData} = require("./controller/drllingactivitymapping.controller")
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(publicRouter);
app.use(privateRouter);



app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App starting in http://localhost:${PORT}`);
});
