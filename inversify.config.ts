
import "reflect-metadata"

import { Container, inject } from 'inversify'
import {buildProviderModule, provide} from 'inversify-binding-decorators'

// set up container
const container = new Container()

export { buildProviderModule,container,provide, inject }