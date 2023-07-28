FROM node:16.14.0-alpine3.15
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./
RUN chown -R node:node /home/node/app
USER node
RUN npm install  
COPY --chown=node:node . .
RUN npx tsc --build

CMD ["npm", "start"]

