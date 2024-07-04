import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
import { continents } from '@prisma/client';

@Controller('basic-reports')
export class BasicReportsController {
   constructor(private readonly basicReportsService: BasicReportsService) { }

   @Get()
   async hello(@Res() resp: Response) {
      const pdfDoc = this.basicReportsService.hello();

      resp.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'Hola-Mundo.pdf';
      pdfDoc.pipe(resp);
      pdfDoc.end();
   }

   @Get('employment-letter')
   async employmentLetter(@Res() resp: Response) {
      const pdfDoc = this.basicReportsService.employmentLetter();

      resp.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'employment-letter.pdf';
      pdfDoc.pipe(resp);
      pdfDoc.end();
   }

   @Get('employment-letter/:employeeId')
   async employmentLetterById(@Res() resp: Response, @Param('employeeId') employeeId: string) {
      const pdfDoc = await this.basicReportsService.employmentLetterById(+employeeId);

      resp.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'employment-letter.pdf';
      pdfDoc.pipe(resp);
      pdfDoc.end();
   }

   @Get('countries')
   async countries(@Res() resp: Response) {
      const pdfDoc = await this.basicReportsService.getCountries();

      resp.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'countries.pdf';
      pdfDoc.pipe(resp);
      pdfDoc.end();
   }

   @Get('countries/:continent')
   async countriesByContinent(@Res() response: Response, @Param('continent') continent: string) {
      if ( !(continent in continents) ) throw Error('Not found continent');
      // console.log(continent);     

      const pdfDoc = await this.basicReportsService.countriesByContinent(continent as continents);

      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'Hola-Mundo.pdf';
      pdfDoc.pipe(response);
      pdfDoc.end();
   }



}
