const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars");
const adminRouter = require("./routes/admin");
const errorController = require("./controllers/error");
const compare = require("./helpers/compare")

app.engine("hbs",expressHbs.engine({layoutsDir:'views/layouts/',defaultLayout: 'main-layout',extname:'hbs', helpers:{isEqual: compare.isEqual}}));

app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"public")));
app.use("/admin",adminRouter);
app.use("/", errorController.Get404);

app.listen(5001);