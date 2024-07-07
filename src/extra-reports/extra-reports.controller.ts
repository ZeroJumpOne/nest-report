import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) { }

  @Get('html-report')
  async getHtmlReport(@Res() response: Response) {

    const pdfDoc = await this.extraReportsService.getHtmlReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'html.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('community-report')
  async  getCommunity(@Res() response: Response) {

    const pdfDoc = await this.extraReportsService.getCommunity();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'html-community.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();

  }

  @Get('custom-size')
  async getCumstom(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.getCustom();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'html-community.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }



}
