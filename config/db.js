import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASSWORD,{
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

//app.use(express.urlencoded({ extended: true }));

// Ruta para procesar el formulario y asignar el rol
// app.post('/asignar-rol', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     // Hashear la contraseña antes de almacenarla en la base de datos
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) {
//             return res.status(500).send('Error al hashear la contraseña');
//         }

//         // Realizar la actualización en la base de datos para asignar el rol
//         const updateQuery = `UPDATE usuarios SET rol = 'tu_rol' WHERE correo = ?`;

//         connection.query(updateQuery, [email], (error, results) => {
//             if (error) {
//                 return res.status(500).send('Error al asignar el rol');
//             }
            
//             res.send('Rol asignado exitosamente');
//         });
//     });
// });

//----------------------------------------------------------------------------------------------------------------------
//  // Asignar el rol del usuario
//  connection.query('SET ROLE \'DBA\'', (error, results) => {
//     if (error) {
//       console.error('Error setting role: ' + error.stack);
//       return;
//     }

//     console.log('Role set successfully');

//     // Ejecutar consulta(prueba)
//     connection.query('SELECT * FROM reservas', (error, results) => {
//       if (error) {
//         console.error('Error executing query: ' + error.stack);
//         return;
//       }

//     //   console.log('Results:', results);
//     });
//   });

export default db;
