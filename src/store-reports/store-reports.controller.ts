import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
   constructor(private readonly storeReportsService: StoreReportsService) { }

   @Get('order/:orderId')
   public async getOrderById(
      @Res() response: Response,
      @Param('orderId') orderId: string,
   ) {

      const pdfDoc = await this.storeReportsService.getOrderById(+orderId);

      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title ='Order / Detail';
      pdfDoc.pipe(response);
      pdfDoc.end();
   }

   @Get('svgs-charts')
   public async getSvgChart(@Res() response: Response) {

      const pdfDoc = await this.storeReportsService.getSvgChart();

      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'svg-chart-report.pdf';
      pdfDoc.pipe(response);
      pdfDoc.end();
   }

   @Get('statistics')
   public async getStatistics(@Res() response: Response) {

      const pdfDoc = await this.storeReportsService.getStatistics();

      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'statistics-report.pdf';
      pdfDoc.pipe(response);
      pdfDoc.end();
   }

}
