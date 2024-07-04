import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { orderByIdReport } from 'src/reports';
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
                customers:  true,
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

}
