require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 3000;

// server at port
app.listen(PORT, console.log(`http://localhost:${PORT}`));
