import express from "express";
import dotenv from "dotenv";
import {User} from "./model/index.js";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const PORT = process.env.BE_PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../front-end/dist/", import.meta.url);
const ReactAppIndex = new URL("../front-end/dist/index.html", import.meta.url);


app.use(express.static(ReactAppDistPath.pathname));
/*
 * express.static match auf jede Datei im angegebenen Ordner
 * und erstellt uns einen request handler for FREE
 * app.get("/",(req,res)=> res.sendFile("path/to/index.html"))
 * app.get("/index.html",(req,res)=> res.sendFile("path/to/index.html"))
 */

app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/api/signup", (req, res) => {
  res.send({ status: "Ok" });
});




app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Erstelle einen neuen Benutzer
    const newUser = new User({ name, email });
    newUser.setPassword(password);

    // Speichert User in DB
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




// app.post("/api/signup", async (req,res)=>{
//   try{
//     const{name, email, password}=req.body;

//     const existingUser=await User.findOne({email});
//     if (existingUser){
//       return res.status(409).json({error: "Benutzer mit dieser E-Mail existiert bereits "});
//     }

//     const newUser =new User({
//       name,
//       email,
//     });

//     newUser.setPassword(password);

//     await newUser.save();

//     res.status(201).json({message: "Registrierung erfolgreich."});
//   }catch(error){
//     res.status(500).json({error: "Interner Serverfehler"})
//   }
// });


app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});


app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});
