import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

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



}
