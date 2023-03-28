# Usa la imagen oficial de Node como base
FROM node:18.14.2-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación de ReactJS
CMD ["npm", "start"]

