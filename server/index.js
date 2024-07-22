const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nameRouts = require("./routes/orderDetailsRoute")
const cors = require("cors")
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/billgenerator', {
}).then(console.log("DB Connected")).catch((err)=>console.log(err));

app.use("/",nameRouts)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});