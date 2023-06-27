const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config({ path: `${__dirname}/.env` });

const uri = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

(async () => {
  try {
    const con = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (!con) throw new Error();
    else console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err.message);
  }
})();

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://${process.env.DOMAIN}:${process.env.PORT}`);
});
