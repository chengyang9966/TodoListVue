const express = require("express");
const connectDB = require("./Config/db");

const app = express();
const PORT = process.env.PORT || 9200;
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./Routes/users"));
app.use("/api/todolist", require("./Routes/todolist"));
app.use("/api/auth", require("./Routes/auth"));

app.get("/", (req, res) => {
  res.json({
    msg: "Hello World",
  });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
