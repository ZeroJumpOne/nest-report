import { ConsoleLogger, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {


    async onModuleInit() {
        await this.$connect();

        // console.log('Connected to the database.');
        
        
    }

    public hello() {
        return this.employees.findFirst();
    }


}
