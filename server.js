const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config({ path: `${__dirname}/.env` });

let uri = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
if (process.env.NODE_ENV === "production") uri.replace("/?", "/?production");

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

const urlDomain =
  process.env.NODE_ENV === "production" ? "" : process.env.DOMAIN;

app.listen(process.env.PORT, urlDomain, () => {
  console.log(`Listening on http://${process.env.DOMAIN}:${process.env.PORT}`);
});
