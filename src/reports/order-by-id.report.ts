import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { Currencyformatter, DateFormatter } from "src/helpers";
import { footerSection } from "./sections";

const logo: Content = {
    image: 'src/assets/Zero-Jump-One-4.jpg',
    width: 300,
    height: 60,
    // alignment: "center",
    marginTop: 5,
    marginLeft: 25,
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
    },
    subHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 0],
    }
}

export interface OrderRespond {
    order_id: number;
    customer_id: number;
    order_date: Date;
    customers: Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id: number;
    customer_name: string;
    contact_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    products: Products;
}

export interface Products {
    product_id: number;
    product_name: string;
    category_id: number;
    unit: string;
    price: string;
}


interface ReportValues {
    title?: string;
    subTitle?: string;
    data: OrderRespond;
}

export const orderByIdReport = (valores: ReportValues): TDocumentDefinitions => {

    const { data } = valores;
    // console.log(data);
    const { customers, order_details } = data;

    const subTotal = order_details.reduce((acum, item) => acum + (item.quantity * +item.products.price), 0);
    const total = subTotal * 1.16;
    // console.log(subTotal);

    return {
        styles: styles,
        header: logo,
        // pageMargins: [0, 20, 0, 0],
        footer: footerSection,
        content: [
            {
                text: 'Zero Jump One',
                margin: [0, 40, 0, 15],
                style: 'header',
            },
            // Direccion propia y numero de orden.
            {
                columns: [
                    {
                        text: `La Cima 307 \n Tonala, Jalisco. Mexico. \n BN: 1234567890 \n http://www.zerojumpone.mx`,
                    },
                    {
                        text: [
                            {
                                text: `Recibo No. ${data.order_id} \n`,
                                bold: true,
                                style: { fontSize: 14, },
                            },
                            {
                                text: `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data.order_date)} \n Pagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}`,
                            }
                        ],
                        alignment: "right",
                    }

                ]
            },
            // QR Code
            {
                qr: 'http://www.zerojumpone.mx',
                fit: 75,
                alignment: "right",
                marginTop: 10,
            },
            // Direccion del cliente
            {
                text: [
                    {
                        text: `Cobrar a: \n`,
                        style: 'subHeader',
                    },
                    {
                        text: `Razon Social: ${customers.customer_name} \n ${customers.contact_name} \n ${customers.address}`,
                    }

                ]
            },
            // Tabla del detalle de la orden
            {
                layout: 'headerLineOnly',
                margin: [0, 10],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['Id', 'Descripcion', 'Cantidad', 'Precio', 'Total'],
                        ...order_details.map((item) => [
                            item.order_detail_id.toString(),
                            item.products.product_name,
                            {
                                text: item.quantity.toString(),
                                alignment: 'right'
                            },
                            {
                                text: Currencyformatter.formatCurrency(+item.products.price),
                                alignment: 'right'
                            },
                            {
                                text: `${Currencyformatter.formatCurrency(item.quantity * +item.products.price)}`,
                                alignment: 'right'
                            }
                        ])
                        // ['1', 'Producto 1', '1', {text: Currencyformatter.formatCurrency(100), alignment: 'right'}, {text:Currencyformatter.formatCurrency(100), alignment: 'right'}],

                    ]

                }
            },

            // Salto de linea
            '\n',
            // Totales
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                ['SubTotal', { text: Currencyformatter.formatCurrency(subTotal), alignment: 'right' }],
                                [{ text: 'Total', bold: true }, { text: Currencyformatter.formatCurrency(total), alignment: 'right', bold: true }],
                            ],
                        },
                    }
                ]
            }

        ]
    };

}