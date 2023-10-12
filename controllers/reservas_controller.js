import {body, param, validationResult} from "express-validator"; //dependencia que ayudara a validar lo que el front envie 
import Reservas from "../models/Reservas.js";

//Obtener todas las reservas (pagina administradores)
// export const getAllReservas=async (req, res)=>{
//   try {
//     const reservas = await Reservas.findAll();
//     res.json(reservas);
//   } catch (error) {
//     console.error('Error al obtener las reservas:', error);
//     res.status(500).json({ error: 'Error al obtener las reservas' });
//   }
// }
//sitemipe
//

//Crear una nueva reserva

  export const crearReserva=async(req, res)=>{
  const { ClienteID, MesaID, FechaHoraReserva, NumeroPersonas, Preferencias, EstadoReserva, Comentarios } = req.body;

  try {
    const reserva = await Reservas.create({
      ClienteID,
      MesaID,
      FechaHoraReserva,
      NumeroPersonas,
      Preferencias,
      EstadoReserva,
      Comentarios,
    });
    res.status(201).json(reserva);
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
}


