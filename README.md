# API Restful con NestJS

Bienvenido a la documentación de mi primera API desarrollada con **NestJS**. Esta API está diseñada para ser consumida por una aplicación Angular y estará desplegada en un entorno de producción. A continuación, encontrarás información detallada sobre su propósito, los principales puntos técnicos y las tecnologías utilizadas.

## Descripción

Esta API tiene como principal propósito proporcionar un conjunto de servicios RESTful para gestionar los datos de la aplicación. La API está desarrollada con **NestJS**, lo cual permite un desarrollo organizado, modular y fácilmente escalable. Además, incluye una documentación de endpoints generada mediante **Swagger**, facilitando así la consulta y pruebas de los servicios.

## Especificaciones Técnicas

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/) para manejar la interacción con la base de datos.
- **Base de Datos**: Utilizamos [Supabase](https://supabase.com/), una plataforma abierta que proporciona funcionalidades avanzadas como Postgres con servicios adicionales.
- **Autenticación**: Manejada mediante **passport-jwt**.
- **Documentación de la API**: Generada con [Swagger](https://swagger.io/).
- **Cliente de Frontend**: La API será consumida por una aplicación desarrollada en [Angular](https://angular.io/).
- **Entorno de Producción**: La API estará configurada para ejecutarse en un servidor de producción, proporcionando alta disponibilidad.

## Características Principales

- Gestión de recursos (entidades definidas con TypeORM).
- Login y autenticación segura utilizando JWT.
- Validaciones de datos utilizando **class-validator**.
- Sólida estructura modular, facilitando la ampliación o mejora de los servicios.
- Documentación interactiva con Swagger para consultas y pruebas en tiempo real.

## Uso de Swagger

La API expone la documentación de sus endpoints mediante Swagger. Al desplegar la API, puedes acceder a esta documentación navegando a la ruta:

http://eclipseoficial.es/api/docs

Desde esta interfaz, puedes consultar todos los endpoints disponibles, sus parámetros, respuestas esperadas y realizar pruebas directamente desde la interfaz web.

## Instalación y Configuración (Desarrollo local)

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/anthonylldev/eclipse-api.git
   cd eclipse-api
   ```

2. **Instala las dependencias**:

   Asegúrate de tener instalado Node.js y npm.

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables necesarias:

   ```plaintext
   DATABASE_URL=<url de tu base de datos, proporcionada por Supabase>
   JWT_SECRET=<clave-secreta-para-jwt>
   ```

4. **Ejecuta el servidor de desarrollo**:

   ```bash
   npm run start:dev
   ```

5. **Accede a Swagger** para probar los endpoints.

## Tecnologías Usadas

- **NestJS**: Framework backend basado en Node.js.
- **TypeORM**: ORM para comunicación con la base de datos.
- **Swagger**: Documentación interactiva de la API.
- **Supabase**: Plataforma de base de datos.
- **JWT (JSON Web Tokens)**: Para autenticación y autorización.

## Consideraciones de Seguridad

Este proyecto ha sido diseñado con las mejores prácticas de seguridad, incluyendo:

- Evitar exponer claves de API o datos sensibles en los registros del sistema o en el repositorio de código.
- Manejo cifrado de los datos sensibles.
- Configuración de variables sensibles como claves JWT y URL de la base de datos en archivos `.env` que jamás serán compartidos públicamente.

## Próximos pasos

- Mejora de seguridad en tiempo de producción y testeo continuo.
- Creación de nuevos endpoints para cubrir futuras necesidades.
- Integración con el cliente Angular en producción.

## Feedback

Dado que este es mi primer proyecto en **NestJS**, cualquier comentario o sugerencia es bienvenido. ¡Gracias por tu interés en este proyecto!