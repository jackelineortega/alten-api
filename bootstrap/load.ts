import { buildProviderModule, container } from "@base/../inversify.config"

/* REST Controllers */
import '@modules/echo/infraestructure/echoController'
import '@modules/reading/infraestructure/readingController'

import '@modules/echo/domain/echoService'
import '@modules/reading/domain/readingService'

container.load(buildProviderModule())