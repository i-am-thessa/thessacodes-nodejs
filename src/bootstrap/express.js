// Starts Express JS (server.js)
require("dotenv").config();
const app = require("../express/app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});