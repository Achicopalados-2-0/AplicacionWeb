
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'root', 
  database: 'ReservasSI', 
});

// Conectar 
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida como el ID ' + connection.threadId);
});

// Cerrar la conexion
connection.end((err) => {
  if (err) {
    console.error('Error al cerrar la conexión: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos cerrada');
});
