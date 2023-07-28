
# API-SALES

Este es la solución al proyecto planteado para tiendamia.com para la validación de las mejores ofertas para productos.


## Authors

- [@armancarr](https://www.github.com/armancarr)


## API Reference

#### Get best offer

```http
  GET /sales/getBestOffer
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sku`     | `string` | **Required**. Sku code     |
| `strategy`| `string` | **Optional**. Strategy to validate best offer. ex: 'A', 'B'     |

#### Save Sales

```http
  POST /sales
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sku`      | `string` | **Required**. SKU code |
| `offerId`      | `number` | **Required**. ID offer selected |
| `quantity`      | `number` | **Required**. Quantity of articles |
| `salesDate`      | `string` | **Required**. Date of sale formate 'yyyy-MM-dd HH:mm:ss' |

#### GET Daily Sales

```http
  GET /sales/getDailySales
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `startDate`      | `string` | **Required**. Start date of sale formate 'yyyy-MM-dd HH:mm:ss' |
| `endDate`      | `string` | **Required**. End date of sale formate 'yyyy-MM-dd HH:mm:ss' |


## Installation


```bash
  cd api-sales
  npm install 
```
You need install local server MONGODB, and import dump 

```bash
  cd api-sales/mongo_dump
```
[Mongo Installation](https://www.mongodb.com/docs/manual/installation/)
    
## Deployment

To deploy this project run

```bash
  npm run build
  npm run start 
```

To deploy this project run dev

```bash
  npm run dev 
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=3000`

`DATABASE= MONGO_DB`

`MONGO_HOST=localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000`

`MONGO_USER= `

`MONGO_DATABASE=sales`

`MONGO_PASSWORD= `

`MONGO_PORT= ''`

`GOOGLE_APPLICATION_CREDENTIALS=`

`CONSOLE_LEVEL= DEBUG`

`PROVIDER_API= URL API Provider ** Optional ** `

`PRIVIDER_STRATEGY= API ** If PROVIDER_API is set then the value is API else is not required ** `
## Appendix

Descripción de la solución: 

- Para el primer punto se diseño un endpoint que recibe el código del sku que se desea evaluar y un campo opcional llamado `strategy`, el cual determina cual de las estrategias se desea utilizar para determinar la mejor oferta. En este endpoint se implementó el patrón de diseño startegy, con el fin de poder implementar dinámicamente distintas estrategias de evaluación de la mejor oferta. Para el ejemplo se determinar 2 estrategias las cuales decribo a continuación: 
    - Estrategia A, consiste en ordenar el array de ofertas por la siguiente prioridad: `Status, price, shipping_price, seller qualifications`
    - Estrategia B,  consiste en ordenar el array de ofertas por la siguiente prioridad: `can_be_refunded, guarantee, status, price`

- El segundo endpoint es para guardar las ventas de los articulos según oferta.

- El tercer endpoint devuelve las ventas del día agrupadas por `sku, oferta` y suma la cantidas de articulo.

- El mock de datos para pruebas se declaro como una constante dentro del proyecto en el folder `config/constants.ts`

De antemano muchas gracias por la oportunidad espero puedan evaluar mi solución y continuar el proceso. 
