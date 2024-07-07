import type { TDocumentDefinitions } from "pdfmake/interfaces"


export const getCommunityReport = (): TDocumentDefinitions => {

    const docDefinition: TDocumentDefinitions = {
        defaultStyle: {
            fontSize: 10,

        },
        content: [
            {
                columns: [
                    {
                        image: 'src/assets/control.jpg',
                        width: 150,
                        // height: 120,
                    },
                    {
                        text: `FOREST ADMIN COMMUNITY SAP \n RUT: 77.218.854-4 \n CAMINO LA MONTAÑA PONIENTE 1180, KM 16 1/2 LAMPA \n TELEFONO: +52 3311 8052`,
                        alignment: 'center',
                    },
                    {
                        alignment: 'right',
                        width: 140,
                        layout: 'borderBlue',
                        table: {
                            body: [
                                [
                                    {
                                        layout: 'noBorders',

                                        table: {
                                            body: [
                                                ['No. Fac:', '123-456'],
                                                ['Fecha:', '2021-09-01'],
                                                ['Versión:', '2024-001'],
                                            ],
                                        },
                                    }
                                ],                                
                            ]

                        }
                    },

                ]
            },

            // Horizontal line
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0,
                        y1: 5,                        
                        x2: 515,
                        y2: 5,
                        lineWidth: 2,
                        lineColor: '#3a4546',
                    }
                ]
            },

            //Detalles del cliente
            {
                table:  {
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Datos del cliente',
                                fillColor: '#5775e1',
                                color: 'white',
                                colSpan: 4,
                                // border: [false, false, false, false],
                            },
                            {},
                            {},
                            {},

                        ],

                        //Razón Social 1er Bloque
                        [

                            {
                                text: 'RAZÓN SOCIAL',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Nombre de la empresa',
                                fillColor: 'white',
                            },
                            {
                                text: 'DIRECCIÓN',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Calle falsa XXX',
                                fillColor: 'white',
                            },
                        ],

                        //RUT
                        [

                            {
                                text: 'RUT',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Zona Centro',
                                fillColor: 'white',
                            },
                            {
                                text: 'TELÉFONO',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: '33 1180 8052',
                                fillColor: 'white',
                            },
                        ],

                        //GIRO
                        [

                            {
                                text: 'GIRO',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Panaderias',
                                fillColor: 'white',
                            },
                            {
                                text: 'CONDICIÓN DE PAGO',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Crédito 30 dias',
                                fillColor: 'white',
                            },
                        ],

                        // Espacio en blanco
                        [
                            {},
                            {},
                            {},
                            {},
                        ],

                        //Proyecto 2do Bloque
                        [

                            {
                                text: 'NOMBRE DEL PROYECTO',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'La ricura del hogar',
                                fillColor: 'white',
                            },
                            {
                                text: 'CONTACTO',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Don Panificador',
                                fillColor: 'white',
                            },
                        ],

                        //RUT
                        [

                            {
                                text: 'DIRECCIÓN',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Arbolito 123',
                                fillColor: 'white',
                            },
                            {
                                text: 'EMAIL',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'pan@laricura.com.mx',
                                fillColor: 'white',
                            },
                        ],

                        //GIRO
                        [

                            {
                                text: 'CIUDAD',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Guadalajara, Jalisco',
                                fillColor: 'white',
                            },
                            {
                                text: 'TELÉFONO',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: '33 3616 00 47',
                                fillColor: 'white',
                            },
                        ],


                    ],
                }
            }




        ],
    }

    return docDefinition;
}