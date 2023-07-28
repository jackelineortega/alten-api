
import { provide } from 'inversify-binding-decorators'
import { TYPES } from '@config/types'
import { IReadingService } from '.'
import { ReadingRepository } from '@modules/reading/application/repositories/reading.repository'
import { inject } from 'inversify'
import { IConfig } from '@config/index'
import { IReadingFileRequest } from '@models/interfaces/readingService'
import { Logger } from '@base/logger'
import { IHttpClient } from '@core/httpClient'
import fs from "fs"
import { XMLValidator } from 'fast-xml-parser';
import { parseString } from "xml2js"; 
import pkg from 'csv-parser';


@provide(TYPES.ReadingService)
export class ReadingService implements IReadingService {
    public repo: ReadingRepository
    public logger: Logger
    public httpClient: IHttpClient
    constructor(
        @inject(TYPES.IConfig) private config: IConfig,
        @inject(TYPES.ILogger)  logger: Logger
    ) {
        this.repo = new ReadingRepository(this.config)
        this.logger = logger
        this.httpClient = this.config.get().httpClient
    }

    public process_reading = async(payload:IReadingFileRequest)=>{
        
        let arrayData:any = []
        let fileExists = false
        let elem:any = payload
        const folder = process.env.FOLDER_BD_FILE
        const file = folder + elem.file
        console.log("file:",file)

        if(elem.file!=="")
        {
            if (fs.existsSync(file)) {
                fileExists = true
                const ext_file = file.split('.')
                const file_ext = ext_file[2]

                if (file_ext == 'xml') {
                    arrayData = await this.extract_data_xml(file);
                    this.logger.debug(`ReadingService->extract_data_xml: Data XML Extraida ${JSON.stringify(arrayData)}`)
                } else {
                    arrayData = await this.extract_data_csv(file);
                    this.logger.debug(`ReadingService->extract_data_csv: Data CSV Extraida ${JSON.stringify(arrayData)}`)
                }
                
                const resp = await this.find_suspicious_reading(arrayData);
                return resp
            } else {
                this.logger.debug(`El archivo NO existe!!`)
                return "\nAlgo ha sucedido: El archivo NO existe!!\n"
            }
        }

    }

    private extract_data_xml = async(file:string) => {
    
        // Leer archivo XML
        try {
            const xmlBuffer = fs.readFileSync(file, "utf8");
            const xmlFile = xmlBuffer.toString();
            const xmlValidator:any = XMLValidator.validate(xmlFile);
            if (xmlValidator.err) {
                this.logger.debug(`XML is invalid becuause of - ${xmlValidator.err.msg} - ${xmlValidator}`);
                return
            }
            if (xmlValidator) {
                this.logger.debug(`XML file is valid ${xmlValidator}`);
            
                // parsing xml data
                const arrayData:any = []
                parseString(xmlFile, (err:any, results:any) => {
                    let data = JSON.parse(JSON.stringify(results)) // parsing to json
                    const arrayLecturas = data.readings.reading
                    arrayLecturas.map((lineData:any) => {
                    const arrayTemp = {
                        clientID : lineData.$.clientID,
                        periodo : lineData.$.period,
                        value :lineData._,
                    }
                    arrayData.push(arrayTemp)
                    return lineData;
                    });
                });
                return arrayData
            }
        } catch (error) { }
        
    }
  
    private extract_data_csv = async(file:string) => {

        // Leer archivo CSV
        return await new Promise(function(resolve, reject) {
            const data = []
            const arrayData:any = []

            fs.createReadStream(file)
                .pipe(pkg())
                .on('data', (row:any) => {
                const arrayTemp = {
                    clientID : row.client,
                    periodo : row.period,
                    value :row.reading,
                }
                arrayData.push(arrayTemp)
                })
                .on('end', () => {
                    console.log("Datos CSV extraidos exitosamente!!");
                    resolve(arrayData)
                })
                .on('error', (error:any) => {
                    // Se ejecuta si hay un error durante la lectura del archivo
                    console.error('Error:', error);
                    reject(error)
                });
        })
    }
  
    private find_suspicious_reading = async(arrayData:any) => { // arrayData : contiene un array con los valores del archivo leido
    
        // Ordenar arrayData por clientID y value
        arrayData.sort((a:any, b:any) => {
        if (a.clientID === b.clientID) { 
            // Si el cliente es el mismo, ordenar por value
            return parseInt(a.value) - parseInt(b.value);
        } else { // Si el cliente es diferente, ordenar por clientID
            return a.clientID.localeCompare(b.clientID);
        }
        });
        // Ahora arrayData contiene la informacion ordenada por clientID y lectura (value)
    
        // Crear un array de valores de lectura, agrupados por 'clientID'. Ej: { '583ef6329d7b9': [ 3564, 40953 ], '583ef6329d81f': [ 37152, 37342, 37398 ] }
        const groupedData:any = {};
        for (const item of arrayData) {
            const { clientID, value } = item;
            if (!groupedData[clientID]) {
                groupedData[clientID] = [];
            }
            groupedData[clientID].push(parseInt(value));
        }
        
        // Funcion que calcula la de media de cada array de lecturas de numeros 
        const calculateMedian = (arr:any) => {
        const sortedArr = arr.slice().sort((a:any, b:any) => a - b);
        const n = sortedArr.length;
        if (n % 2 === 0) {
            return (sortedArr[n / 2 - 1] + sortedArr[n / 2]) / 2;
        } else {
            return sortedArr[Math.floor(n / 2)];
        }
        };
    
        // Calcula la mediana del array de valores agrupados por clientID, creo un nuevo array de objetos llamado medians, en el cual se guarda el clientID, la media y los valores ± 50 % de la media encontrada. Ej: [{ clientID: '583ef6329d7b9', median: 42798.5, _50up: '64197.8', _50down: '21399.3' }, { clientID: '583ef6329d81f', median: 37763, _50up: '56644.5', _50down: '18881.5' }]
        const medians = [];
        for (const clientID in groupedData) {
        if (groupedData.hasOwnProperty(clientID)) {
            const median = calculateMedian(groupedData[clientID]);
            const _50up = (median * 1.5).toFixed(1); // Se obtiene el +50% de la mediana
            const _50down = (median * 0.5).toFixed(1); // Se obtiene el -50% de la mediana
            medians.push({ clientID, median, _50up, _50down });
        }
        }
    
        /**  
         * Luego de tener los arrays y valores obtenidos anteriormente, 
         * se procede a recorrer los registros de la data inicial para reconocer 
         * que lecturas estan ± 50 % más altas o más bajas que la mediana anual por cliente
        */
        const suspiciousReading:any = []
        for (const clientID in groupedData) { // Recorrer array groupedData, que tiene las lecturas ordenadas ascendente, agrupadas por clientID
            if (groupedData.hasOwnProperty(clientID)) {
                const medianCLientId = medians.find(item => item.clientID === clientID); // Buscar en array Mediana, los valores del clientID
        
                if (medianCLientId) {
                const _50up = medianCLientId._50up
                const _50down = medianCLientId._50down
                const arrayReadings = groupedData[clientID]; // Extraer array de lecturas del clientID
                arrayReadings.forEach((reading:any) => {  // Recorrer el array de lecturas, para comparar si se encuentra dentre del +50% (_50up) y -50% (_50down) de la mediana
                    if(reading < _50down || reading > _50up) { // Si se cumple ha encontrado una lectura sospechosa
                        const foundItems = arrayData.filter((item:any) =>  item.clientID == clientID && item.value == reading ); // Se busca en arrayData el registro que pertenece a ese clientID y a la lectura sospechosa encontrada (array de valores iniciales ordenado por clientID y value) (se asume que el cliente no tendra valores repetidos por mes, para efectos de tiempo y validacion)
                        suspiciousReading.push({clientID,periodo:foundItems[0].periodo,lectura:reading,mediana:medianCLientId.median})
                    }
                });
                } else {
                console.log("No se encontró ningún objeto con el clientID proporcionado.");
                }
            }
        }

        if (suspiciousReading.length > 0) {
            return suspiciousReading
        } else return "\nBuenas noticias: No se encontraron lecturas sospechosas en el archivo seleccionado!!\n";
   
    }

}
