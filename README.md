
# API-ALTEN

Este es la solución a la prueba tecnica enviada por ALTEN, donde se requiere identificar lecturas que sean más altas o más bajas que la mediana anual ± 50 % de los clientes que se encuentran inicialmente en un archivo .csv o .xml, pero puede luego tomarse de una base de datos o cualquier metodo de entrada.

OJO : Deben ejecutarse las dos app para que funcione: api-hola y app-hola-luz, el codigo de ambos proyectos se encuentran en la rama `develop`.

## Authors

- [@jackelineortega](https://www.github.com/jackelineortega)


## API Reference

## Installation


```bash
  cd alten-api
  npm install 
```


## Environment Variables

Para correr el proyecto, necesitamos las sigueinte variables de entorno en el archivo .env, copiar de .env_sample

`PORT=3000`
`FOLDER_BD_FILE = ./uploads/reading/`
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

## Appendix

Descripción de la solución: 

- En esta API se requiere la lectura de los contadores de la empresa HOLA LUZ, para un listado de clientes durante un año, dado en cualquier metodo de entrada (basado en la arquitectura hexagonal), en este caso se realizo a traves de la lectura de archivos .csv o .xml que tienen la informacion, y que se asume ya se encuentran cargados en una carpeta del servidor, en este caso uploads/reading, luego del analisis de los datos se debe mostrar un listado de los meses que tienen lecturas sospechosas por cliente.

- La API es llamada a traves de metodo POST, al endpoint `_processFile` que se encuentra en `modules/reading/infraestructure/readingController`, tiene sus validaciones de Request, y llama al servicio `process_reading` que esta en la ruta `modules/reading/domain/readingService`.

- En este servicio `process_reading`, se valida si el nombre del archivo recibido como parametro se encuentra en la ruta `uploads/reading` tercer endpoint devuelve las ventas del día agrupadas por `sku, oferta` y suma la cantidas de articulo, asi como la extension del mismo, para llamar al metodo correspondiente para la lectura de los datos.

- En la extraccion de la informacion se obtiene un objeto con la estructura 
{
  clientID : 'id del Cliente',
  periodo : 'fecha del mes',
  value : 'valor contador', 
}

- Obtenido el objeto con los datos de los contadores por mes, se procede a ordenar el objeto por clientID y value, para poder tener ordenado de manera ascedente las medidas del contador para encontrar la mediana.

- Con este objeto se crea uno nuevo `groupedData` el cual tendra agrupado por cliente las medidas, para tener poder manipularlas mas facilmente 
{ 
  '583ef6329d7b9': [ 3564, 40953, 41223, 41345, 41576, 41877, 41987, 41990, 42546, 43540, 71000 ], 
  '583ef6329d81f': [ 37152, 37342, 37398, 37456, 37543, 37788, 37900, 38243, 38678, 38690, 39878, 39990 ] 
}
                   
- Se procede a obtener la mediana de cada array de medidas por cliente, y seguido se crea un array de objetos `medians` el cual contiene la mediana, la madiana mas su 50% y la mediana menos su 50%, 
{ 
  clientID : 'id del Cliente', 
  median : 'mediana encontrada por el cliente', 
  _50up : 'mediana + 50%', 
  _50down : 'mediana - 50%' 
}

- Finalmente se recorre el objeto `groupedData`, y el array de medidas y por cada medida del cliente se consulta si este numero esta comprendido dentro del rango encontrado por el cliente _50up y _50down del array `medians`, cuando se encuentra una medida fuera de este rango, se agrega al array de objetos `suspiciousReading`, el cual tendra las medidas sospechosas encontradas:
{
  clientID : 'id del Cliente',
  periodo : 'fecha del mes',
  lectura : 'valor contador',
  mediana: 'mediana del cliente por año'
}

- Este array `suspiciousReading` se retorna al app que realizo la llamada a API y se muestra en la terminal de la app, en caso de no encontrar sospechosos, retornará un mensaje, asi como tambien en caso de algun error durante el flujo.

- Por falta de tiempo y querer entregar, faltaron los test pero aclaro que si tengo el conocimiento de test en Jest e intentare realizarlos para mostrarlos en la siguiente etapa.

Cualquier duda estoy dispuesta a aclararla.

De antemano muchas gracias por la oportunidad espero puedan evaluar mi solución y continuar el proceso. 
