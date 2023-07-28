
export enum TYPES_DATA_BASE {
    BIGQUERY = 'BIGQUERY',
    DATASTORE = 'DATASTORE',
    ELASTIC = 'ELASTIC',
    MYSQL = 'MYSQL',
    MONGO_DB = 'MONGO_DB',
    POSTGRESS_SQL = 'POSTGRESS_SQL',
    FILE = 'FILE'
}

export enum TYPES_MESSAGING {
    PUBSUB = 'PUBSUB',
    NATS = 'NATS',
}

export enum TYPES_MESSAGING_LEVEL{
    DEBUG,
    ERROR,
    INFO,
    LEGAL,
    OPERATION
}

export enum TYPES_CONSOLE_LEVEL{
    DEBUG,
    ERROR,
    INFO
    
}

export enum TYPES_LEVEL{
    DEBUG='DEBUG',
    ERROR='ERROR',
    INFO='INFO',
    LEGAL="LEGAL",
    OPERATION='OPERATION'
}

export enum TYPES_C_LEVEL{
    DEBUG='DEBUG',
    ERROR='ERROR',
    INFO='INFO',
}

export enum TYPES_ERRORS{
    invalid_data_format= 'invalid_data_format',
    internal_server_error = 'internal_server_error',
    data_not_found = 'data_not_found'
    
}

export enum TYPES_HTTPCLIENT{
    AXIOS ='AXIOS',
    HTTPREQUEST = 'HTTPREQUEST'
}


