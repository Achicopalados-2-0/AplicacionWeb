import express from "express"
import dotenv from "dotenv"
import cliente_rutas from "./routes/clientes_rutas.js";
import db from "./config/db.js";
import helmet from "helmet"; //modifica cabeceras
import cors from "cors";
import path from "path";
//Contruye rutas  hacia otros directorios
const app = express();
app.use(helmet());

// Habilitar lectura de datos de formularios
app.use(express.json());

dotenv.config();
// Configurar el middleware para servir archivos estáticos desde carpetas específicas
//app.use('/css', express.static(path.join(__dirname, 'css')));
//app.use('/images', express.static(path.join(__dirname, 'images')));
//app.get('/css', (req, res) => { res.sendFile(`${__dirname}css`) })

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')) })
//app.get('/', (req, res) => { res.sendFile(`${__dirname}index.html`) })
//app.get('/', (req, res) => { res.sendFile(`${__dirname}login.html`) })
//app.get('/', (req, res) => { res.sendFile(`${__dirname}`) })
//conexion a front
//const dominiosPermitidos = ['https://achicopalados.main'];
//const corsOptions = {
  //  origin: function(origin, callback){
    //    if(dominiosPermitidos.indexOf(origin) !== -1){
      //      callback(null, true);
        //}else{
          //  callback(new Error("No permitido por CORS"))
        //}
    //}
//}

//app.use(cors(corsOptions)) //seguridad(especificar que rutas estan permitidas para hacer llamados)

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
