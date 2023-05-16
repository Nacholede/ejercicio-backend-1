import winston from 'winston'
import config from '../config.js'

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'magenta',
        info: 'green',
        http: 'blue',
        debug: 'white'
    }
}

let logger 

if(config.node_env === 'development') {
    logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            })
        ]
    })
} else if (config.node_env === 'production') {
    logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                level: 'error',
                filename: './errors.log',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                )
            })
        ]
    })
} else {
    console.log('Variabla de entorno no reconocida')
}

export default logger