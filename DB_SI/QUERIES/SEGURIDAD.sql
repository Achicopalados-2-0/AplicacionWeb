-- USUARIOS
DROP USER 'Erick'@'localhost';
DROP USER 'Eduardo'@'localhost';
DROP USER 'Carlos'@'localhost';
DROP USER 'Brenda'@'localhost';

CREATE USER 'Erick'@'localhost' IDENTIFIED BY 'contrasena_de_Erick';
CREATE USER 'Eduardo'@'localhost' IDENTIFIED BY 'contrasena_de_Eduardo';
CREATE USER 'Carlos'@'localhost' IDENTIFIED BY 'contrasena_de_Carlos';
CREATE USER 'Brenda'@'localhost' IDENTIFIED BY 'contrasena_de_Brenda';

-- SEGURIDAD(ROLES)

DROP ROLE IF EXISTS DBA;
DROP ROLE IF EXISTS Frontend;
DROP ROLE IF EXISTS Testing;
DROP ROLE IF EXISTS Backend;

-- Administrador (ERICK) 
CREATE ROLE DBA;
GRANT ALL PRIVILEGES ON ReservasSI.* TO DBA;

-- Frontend(EDUARDO)
CREATE ROLE Frontend;

GRANT SELECT ON ReservasSI.Reservas TO Frontend;
GRANT SELECT ON ReservasSI.Mesas TO Frontend;

-- Testing(CARLOS)
CREATE ROLE Testing;

GRANT SELECT ON ReservasSI.Reservas TO Testing;
GRANT SELECT ON ReservasSI.Mesas TO Testing;

-- Backend(BRENDA)
CREATE ROLE Backend;

GRANT SELECT, INSERT, UPDATE, DELETE ON ReservasSI.Reservas TO Backend;
GRANT SELECT, INSERT, UPDATE, DELETE ON ReservasSI.Mesas TO Backend;


GRANT DBA TO 'Erick'@'localhost';
GRANT Frontend TO 'Eduardo'@'localhost';
GRANT Testing TO 'Carlos'@'localhost';
GRANT Backend TO 'Brenda'@'localhost';


FLUSH PRIVILEGES;

