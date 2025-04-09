# Use a imagem oficial do Node.js para construir o projeto
FROM node:16 AS build

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos do projeto para o container
COPY package*.json ./
RUN npm install
COPY . .

# Construa o projeto Angular
RUN npm run build --prod

# Use uma imagem NGINX para servir o aplicativo Angular
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80 para acessar o aplicativo
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
