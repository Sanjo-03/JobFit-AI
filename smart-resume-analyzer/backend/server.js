import express from "express";
import cors from "cors";
// import dotenv from "dotenv"; // <--- REMOVE THIS LINE
import analyzeRoute from "./routes/analyze.js"; // This import is correct

// console.log("1. Before dotenv.config()"); // <--- REMOVE THIS LINE
// dotenv.config(); // <--- REMOVE THIS LINE
// console.log("2. After dotenv.config()"); // <--- REMOVE THIS LINE

console.log("PORT:", process.env.PORT); // This log will now show the loaded value
console.log("OPENAI_API_KEY (first few chars):", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 5) + "..." : "Not set"); // This log will now show the loaded value

const app = express();
console.log("3. After express() init"); //
const PORT = process.env.PORT || 3001; //

app.use(cors()); //
console.log("4. After cors()"); //
app.use(express.json()); //
console.log("5. After express.json()"); //

app.use("/api", analyzeRoute); //
console.log("6. After analyzeRoute setup"); //

app.get("/", (req, res) => { //
  res.send("Smart Resume Analyzer backend is running."); //
});

console.log("7. Before app.listen()"); //
app.listen(PORT, () => { //
  console.log(`🚀 Server running at http://localhost:${PORT}`); //
});