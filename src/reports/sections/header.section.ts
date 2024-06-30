import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
   image: 'src/assets/control.jpg',
   width: 160,
   height: 120,
   // alignment: 'center',
   // margin: [0,0,0,20]
}

interface HeaderOptions {
   title?: string;
   subtitle?: string;
   showLogo?: boolean;
   showDate?: boolean;

}

export const headerSection = (options: HeaderOptions): Content => {

   const { title, subtitle, showLogo = true, showDate = true } = options;

   const headerLogo: Content = showLogo ? logo : null;
   const headerDate: Content = showDate
      ? {
         text: DateFormatter.getDDMMMMYYYY(new Date()),
         alignment: 'right',
         margin: [0, 20, 10, 20],
      }
      : null;

   const headerTitle: Content = title
      ? {
         text: title,
         style: {
            bold: true,
         },
      }
      : null;

   return {
      columns: [headerLogo, headerTitle,  headerDate],
   }
}