import express from "express"
import dotenv from "dotenv"
import cliente_rutas from "./routes/clientes_rutas.js";
import db from "./config/db.js";
import helmet from "helmet"; //modifica cabeceras

const app = express();
app.use(helmet());

// Habilitar lectura de datos de formularios
app.use(express.json());

dotenv.config();
app.use("/auth", cliente_rutas)

// conexion a la base de datos
try{
    await db.authenticate();
    db.sync();
    console.log('Conexion exitosa a la base de datos');
}catch(error){
    console.log(error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en la ruta http://localhost:${PORT}`)
})