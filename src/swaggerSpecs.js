import swaggerJSDoc from 'swagger-jsdoc'
import {__dirname} from './utils.js'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nacholede API documentacion',
            version: '1.0.0'
        }

    },
    apis: [`${__dirname}/docs/*/*.yaml`]
}

export const swaggerSetup = swaggerJSDoc(swaggerOptions)