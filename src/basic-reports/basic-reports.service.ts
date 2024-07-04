import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient, countries as Country, continents } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getCountriesReport, getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';


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

    public async employmentLetterById( employeeId: number) {
        const employee = await this.employees.findUnique({
            where: {
                id: employeeId
            }
        });

        console.log(employee);
        

        if (!employee) {
            throw new NotFoundException(`Employee with id ${employeeId} not found.`);
        }

        const docDefinition = getEmploymentLetterByIdReport({
            employerName: 'Isaac Hdez Castro',
            employerPosition: 'CEO',
            employerCompany: 'Zero Jump One' ,
            employeeName: employee.name ,
            employeePosition: employee.position ,
            employeeStartDate: employee.start_date ,
            employeeHours: employee.hours_per_day ,
            employeeWorkSchedule: employee.work_schedule ,
        });

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    public async getCountries() {

        const countries = await this.countries.findMany({
            where: {
                local_name: {
                    not: null,
                }
            }
        });
        
        const docDefinition = getCountriesReport({ countries: countries });

        return this.printerService.createPdf(docDefinition);
    }

    public async countriesByContinent( continent: continents ) {
        // if (!continent) throw Error('Continent not exist.');
        // console.log(continent);
        
        const countries: Country[] = await this.countries.findMany({
            where: {
                local_name: {
                    not: null,
                },
                continent: continent,
            }
        });
        // console.log(countries);

        const docDefinition = getCountriesReport({ countries: countries });

        return this.printerService.createPdf(docDefinition);
    }



}
