const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
mongoose.set("useCreateIndex", true);
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-3lmhn.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
app.use(express.json());
app.use(routes);

app.listen(3333);
