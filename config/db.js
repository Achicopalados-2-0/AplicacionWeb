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
