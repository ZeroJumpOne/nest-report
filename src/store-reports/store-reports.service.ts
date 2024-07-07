import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport, getStatisticsReport, getSvgChartReport, orderByIdReport } from 'src/reports';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {

    constructor(private printerService: PrinterService) {
        super();
    }

    async onModuleInit() {
        await this.$connect();
    }

    public async getOrderById(orderId: number) {

        const order = await this.orders.findUnique({
            where: {
                order_id: orderId
            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true
                    }
                }
            },
        });

        if (!order) {
            throw new NotFoundException(`Order width id ${orderId} not found.`)
        }

        // console.log(JSON.stringify(order, null, 3));

        const docDefinition = orderByIdReport({
            data: order as any,
        });

        return this.printerService.createPdf(docDefinition);
    }

    public async getSvgChart() {

        const docDefinition = await getSvgChartReport();

        return this.printerService.createPdf(docDefinition);
    }

    public async getStatistics() {

        const topCountries = await this.customers.groupBy({
            by: ['country'],
            _count: true,
            orderBy: {
                _count: {
                    country: 'desc',
                },
            },
            take: 10
        });

        const topCountriesData = topCountries.map( ({ country, _count}) => ({
            country: country,
            customers: _count,
        }));

        console.log(topCountries);


        const docDefinition = await getStatisticsReport({
            topCountries: topCountriesData,
        });

        return this.printerService.createPdf(docDefinition);
    }

}
