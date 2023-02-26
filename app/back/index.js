const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2/promise");

const connection = {
  host: "mysql",
  user: "root",
  database: "bldb",
  password: "example",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
// let lists = {
//   baseList: [
//     { ElementName: "Апельсин", bay_state: false },
//     { ElementName: "Мандарин", bay_state: false },
//     { ElementName: "Яблоко", bay_state: false },
//   ],
//   allList: [
//     {
//       name: "works",
//       mas_elements: [
//         { ElementName: "Сходить", bay_state: false },
//         { ElementName: "Заказать", bay_state: false },
//         { ElementName: "Забить", bay_state: false },
//       ],
//     },
//     {
//       name: "byus",
//       mas_elements: [
//         { ElementName: "Апельсин", bay_state: false },
//         { ElementName: "Мандарин", bay_state: false },
//         { ElementName: "Яблоко", bay_state: false },
//       ],
//     },
//     {
//       name: "date",
//       mas_elements: [
//         { ElementName: "11", bay_state: false },
//         { ElementName: "12", bay_state: true },
//         { ElementName: "13", bay_state: false },
//       ],
//     },
//   ],
// };

// async function GetAllLists() {
//   lists = { baseList: [], allList: [] };
//   let sql = "SELECT * FROM lists ";

//   // connection.connect(function (err) {
//   //   if (err) {
//   //     return console.error("Ошибка: " + err.message);
//   //   } else {
//   //     console.log("Подключение к серверу MySQL успешно установлено");
//   //   }
//   // });

//   let qer = await pool.query(sql, function (err, result) {
//     if (err) throw console.error("Ошибка: " + err.message);
//     console.log("Result: " + typeof result);
//     console.log("get result");
//     return result
//   });

//   console.log("lists on GetAllLists:");
//   console.log(await ans);

//   return qer;

//   // connection.end();

//   // answ.

//Роуты

// async function StartApp(params) {
//   try {
//     let lists = await GetAllLists();
//     console.log('lists: ', lists);

//   } catch (error) {
//     console.log("error: ", error);
//   }
// }
// StartApp();
async function GetAllLists() {
  lists = { baseList: [], allList: [] };
  let sqlReq = "SELECT * FROM lists ";
  const conn = await mysql.createConnection(connection);
  const [rows, fields] = await conn.execute(sqlReq, [2, 2]);
  console.log("rows: ");
  console.log(rows);
  await conn.end();

  rows.forEach((element) => {
    switch (element.listName) {
      case "baseList":
        lists.baseList.push({
          ElementName: element.item,
          bay_state: element.state,
        });
        break;

      default:
        let indexList = lists.allList.indexOf(element.listName);
        if (indexList < 0) {
          lists.allList.push({
            name: element.listName,
            mas_elements: [
              { ElementName: element.item, bay_state: element.state },
            ],
          });
        } else {
          lists.allList[indexList].mas_elements.push({
            ElementName: element.item,
            bay_state: element.state,
          });
        }
        break;
    }
  });
  return lists;
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.get("/lists", (req, res) => {
  async function getDataLists(params) {
    let answ = await GetAllLists();
    console.log("answ: ");
    console.log(answ);

    return { answ };
  }
  let lists = getDataLists();
  console.log("lists in get: ");
  console.log(lists);
  res.json({ lists });
});
