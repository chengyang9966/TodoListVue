const express = require("express");

const app = express();
const PORT = process.env.PORT || 8230;
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
