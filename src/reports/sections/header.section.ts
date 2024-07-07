import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
   image: 'src/assets/control.jpg',
   width: 140,
   height: 100,
   // alignment: 'center',
   // margin: [0,0,0,20]
}

interface HeaderOptions {
   title?: string;
   subtitle?: string;
   showLogo?: boolean;
   showDate?: boolean;

}

export const headerSection = (headerOptions: HeaderOptions): Content => {

   const { title, subtitle, showLogo = true, showDate = true } = headerOptions;

   const currentDate: Content = {
      text: DateFormatter.getDDMMMMYYYY(new Date()),
      alignment: 'right',
      margin: [20, 30],
      width: 140,
   }

   const headerLogo: Content = showLogo ? logo : null;
   const headerDate: Content = showDate ? currentDate : null;

   const headerSubTitle: Content = subtitle ? {
      stack: [
         {
            text: subtitle,
            alignment: "center",
            margin: [0, 2, 0, 0],
            style: {
               // bold: true,
               fontSize: 15,
            },
         },
      ],
   } : null;

   const headerTitle: Content = title ? {
      stack: [
         {
            text: title,
            alignment: "center",
            margin: [0, 20, 0, 0],
            style: {
               bold: true,
               fontSize: 22,
            },
         },
         headerSubTitle,
      ],
   } : null;

   return {
      columns: [headerLogo, headerTitle, headerDate],
   }
}