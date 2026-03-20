FROM node
WORKDIR /App
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npx","nodemon","index.js"]