const app = require('./app');
const connectDb = require('./config/dbConnect'); // Adjust the path accordingly

const PORT = process.env.PORT || 8080;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error("Error connecting to the database:", error);
});
