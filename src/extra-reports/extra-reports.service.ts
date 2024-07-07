import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import fs from 'fs';
import { footerSection, headerSection } from 'src/reports/sections';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {

   constructor(private printerService: PrinterService) {}

   async getHtmlReport() {

      const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');
      // console.log(html);

      const content = getHtmlContent(html, {
         title: 'Funciones trigonometricas',
      });

      const docDefinition: TDocumentDefinitions = {
         pageMargins: [40,110,40,60],
         header: headerSection({
            title: 'Html to pdfMake',
         }),
         footer: footerSection,
         content: content,

      };

      return this.printerService.createPdf(docDefinition);
   }

   public async getCommunity() {

      const docDefinition = getCommunityReport();

     const doc = this.printerService.createPdf(docDefinition);

     return doc;
   }

   public async getCustom() {
      const docDefinition = getCommunityReport();

     const doc = this.printerService.createPdf({
      pageSize: {
         width: 150,
         height: 300,
      },
      content: [
         {
            qr: 'http://www.zerojumpone.mx',
            fit: 100,
            alignment: 'center'
         },
         {
            text: 'Reporte con tamaño',
            fontSize: 10,
            alignment: 'center',
            marginTop: 10,
         }

      ]
     });

     return doc;
   }
}
