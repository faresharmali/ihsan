import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";



export  const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
export const PrintData = async (title, heading, data) => {
  data.forEach((d) => {
    delete d.identifier;
    delete d._id;
  });
  let columns = [];

  data.reverse().forEach((element) => {
    let column = "";
    Object.keys(element).forEach((key) => {
      column += `  <td> ${element[key]}</td>`;
    });
    columns.push(`<tr>
   ${column}
    </tr>`);
    column = "";
  });
  let headings = [];
  heading.forEach((element) => {
    headings.push(`<th>${element}</th>`);
  });

  const html = `
    <html>
    <style>
    table, td, th {
      border: 1px solid;
    }
    h2{
      width:100%;
      text-align:right;
    }
    table{
      width:100%;
      border-collapse: collapse;
    }
    tr{
      width:100%;
    }
    th,td{
      text-align:right;
    }
    </style>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>

      <body style="text-align: center;">
      <h1>${title}</h1>
      <h2> ${
        new Date().getFullYear() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getDate()
      }  : التاريخ <h2>
      <table>
      <tr>
      ${headings.join("  ")}
      </tr>
      ${columns.join("  ")}
      </table>
      </body>
    </html>
    `;

  const { uri } = await Print.printToFileAsync({ html });
  await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};
const Pring = () => {
  return null;
};

export default Pring;
