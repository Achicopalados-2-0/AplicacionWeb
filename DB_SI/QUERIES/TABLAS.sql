-- BASE DE DATOS "ReservasSI" 
CREATE DATABASE IF NOT EXISTS ReservasSI;
USE ReservasSI;
DROP TABLE IF EXISTS Reservas;
DROP TABLE IF EXISTS Clientes;
DROP TABLE IF EXISTS Mesas;

-- CLIENTES
CREATE TABLE Clientes (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    CorreoElectronico VARCHAR(100),
    Telefono VARCHAR(10),
    Contrasena VARCHAR(100)
);

-- MESAS
CREATE TABLE Mesas (
    MesaID INT AUTO_INCREMENT PRIMARY KEY,
    NumeroMesa VARCHAR(20),
    Capacidad INT,
    EstadoMesa ENUM('ocupada', 'disponible', 'reservada') DEFAULT 'disponible'
);

-- RESERVAS
CREATE TABLE Reservas (
    ReservaID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    MesaID INT,
    FechaHoraReserva DATETIME,
    NumeroPersonas INT,
    Preferencias TEXT,
    EstadoReserva ENUM('confirmada', 'pendiente', 'cancelada') DEFAULT 'pendiente',
    Comentarios TEXT,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
    FOREIGN KEY (MesaID) REFERENCES Mesas(MesaID)
);
