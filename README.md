# Proyecto Cajero ATM

Este proyecto simula el funcionamiento de un cajero automático (ATM) con funcionalidades de inicio de sesión, consulta de saldo, depósito, retiro y transferencia entre cuentas.

## Descripción

El sistema está dividido en varias páginas HTML, cada una con su propia funcionalidad:

- **Login:** Permite al usuario ingresar con su ID de tarjeta y PIN.
- **Menú Principal:** Acceso a las diferentes operaciones disponibles (Depósito, Retiro, Consulta de saldo).
- **Depósito:** Permite ingresar dinero a la cuenta del usuario.
- **Retiro:** Permite retirar dinero de la cuenta del usuario.
- **Consulta de saldo:** Permite consultar el saldo disponible en la cuenta del usuario.

### Tecnologías utilizadas

- **Frontend:**
  - HTML
  - CSS
  - JavaScript (Vanilla JS)
  
- **Backend:**
  - Node.js con Express (para la API)
  - MongoDB (para la base de datos de las tarjetas)

### Funcionalidades

- **Inicio de sesión:** Verificación de la ID de tarjeta y PIN para autenticar al usuario.
- **Depósito:** Permite ingresar una cantidad al saldo de la cuenta del usuario.
- **Retiro:** Permite retirar una cantidad del saldo de la cuenta, siempre que haya suficiente saldo.
- **Transferencia:** Permite transferir dinero de una cuenta a otra.
- **Consulta de saldo:** Muestra el saldo actual del usuario.
- **Historial de transacciones:** Consulta el historial de las transacciones realizadas por el usuario.

## Instalación

### Requisitos

- Node.js (versión 14 o superior)
- MongoDB en ejecución (local o en la nube)

### Pasos para ejecutar el proyecto

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/atm-project.git
