import { TDocumentDefinitions } from "pdfmake/interfaces";
import { footerSection, headerSection } from "./sections";
import { countries as Country } from "@prisma/client";

interface ReportOptions {
   title?: string;
   subTitle?: string;
   countries: Country[];
}

export const getCountriesReport = (options: ReportOptions): TDocumentDefinitions => {

   const { title, subTitle, countries } = options;

   return {
      pageOrientation: 'landscape',
      header: headerSection({
         title: title ?? 'Countries Report',
         subtitle: subTitle ?? 'List of countries',
      }),
      footer: footerSection,
      pageMargins: [40, 100, 40, 60],
      content: [
         {
            layout: 'customLayout01', //'lightHorizontalLines', // optional
            table: {
               // headers are automatically repeated if the table spans over multiple pages
               // you can declare how many rows should be treated as headers
               headerRows: 1,
               widths: [50, 50, 50, '*', 'auto', '*'],
               body: [
                  ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
                  ...countries.map((country) => [
                     country.id.toString(),
                     country.iso2,
                     country.iso3,
                     { text: country.name, bold: true },
                     country.continent,
                     country.local_name
                  ]),
                  ['', '', '', '', '', ''], /* Dibuja la linea de la parte baja y como no hay datos parace tener una doble linea. */
                  ['', '', '', '', 'Total', `${ countries.length } países`],

                  // [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
               ]
            }
         },

         //otro bloque de contenido
         {
            text: 'Totales',
            style: {
               fontSize: 18,
               bold: true,
               margin: [ 0, 40 ,0 ,0],
            },
         },
         {
            layout: 'noBorders',
            table: {
               headerRows: 1,
               widths: [50, 50, 70, '*', 'auto', '*'],
               body: [
                  [
                     {
                        text: 'Total de países',
                        colSpan: 2,
                        bold: true,
                     },
                     {},
                     {
                        text: ` ${countries.length} países`,
                        bold: true,
                     },
                     {},
                     {},
                     {},
                  ]

               ]
            }
         }
      ]
   }





}