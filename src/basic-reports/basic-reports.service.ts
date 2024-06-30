import { ConsoleLogger, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

    constructor(private readonly printerService: PrinterService) {
        super();
    }

    async onModuleInit() {
        await this.$connect();

        // console.log('Connected to the database.');
        
        
    }

    public hello() {
        const docDefinition = getHelloWorldReport({
            name: 'Fernando Herrera',
        });

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    public employmentLetter() {
        const docDefinition = getEmploymentLetterReport();

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }


}
