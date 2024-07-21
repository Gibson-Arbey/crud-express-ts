import express, { Application } from "express";
import cors from "cors"

import userRoutes from "../routes/usuario.routes";
import db from "../db/conexion";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? "8000";

    // Conexion a la base de datos
    this.dbConexion();

    
    // Middlewares
    this.middlewares();

    // Definir rutas
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Servidor corriendo en el puerto", this.port)
    );
  }

  async dbConexion() {
    try {
      await db.authenticate();
      console.log("Conexion a la base de datos exitosa");
    } catch (error) {
      throw new Error("error al conectar a la base de datos");
      
    }
  }

  middlewares() {
    // CORS
    this.app.use( cors() );

    // Lectura del body
    this.app.use( express.json() );

    // Carpeta publica
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }
}

export default Server;
