require("module-alias/register")
import "reflect-metadata"

import { InversifyExpressServer } from 'inversify-express-utils'
import bodyParser from 'body-parser'
import { container } from '../inversify.config'

// Inicializar configuracion desde ambiente
import { Config } from '../config/index'
const config = new Config()

import { TYPES } from "../config/types"

const cors = require('cors')

// cargar las entidades inyectables
import '@bootstrap/load'
// registrar instancia de config en container de dependencias
container.bind<any>(TYPES.IConfig).toConstantValue(config)

import {Logger} from '@base/logger'
const logger:Logger = new Logger(config)
container.bind<any>(TYPES.ILogger).toConstantValue(logger)
// create server
let server = new InversifyExpressServer(container)
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors({origin: '*'}))
})

let app = server.build();
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('running on port :', PORT)
})

exports = module.exports = app