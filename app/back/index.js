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
  // connectionLimit: 10,
  // queueLimit: 0,
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

async function GetAllLists() {
  let lists = { baseList: [], allList: [] };
  let sqlReq = "SELECT * FROM lists ";
  const conn = await mysql.createConnection(connection);
  const [rows, fields] = await conn.execute(sqlReq, [2, 2]);
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
        if (lists.allList.length <= 0) {
          // console.log("allList Пуст добавляем первй список", element.listName);
          lists.allList.push({
            name: element.listName,
            mas_elements: [
              { ElementName: element.item, bay_state: element.state },
            ],
          });
        } else {
          // console.log("AllList Не пуст");
          lists.allList.forEach((listElem) => {
            if (listElem.name === element.listName) {
              // console.log(                "Имя списка совподает пытаемся добавить новый элемент в список"              );
              listElem.mas_elements.push({
                ElementName: element.item,
                bay_state: element.state,
              });
            } else {
              // console.log(                "Имя списка НЕ найдено в обьекте. Добовляем список",                listElem.name              );
              lists.allList.push({
                name: element.listName,
                mas_elements: [
                  { ElementName: element.item, bay_state: element.state },
                ],
              });
            }
          });
        }
    }
  });
  return lists;
}

app.use(express.json());

app.get("/lists", async (req, res) => {
  let lists = await GetAllLists();
  res.json(lists);
});
app.post("/saveList", async (req, res) => {
  // const buffers = []; // буфер для получаемых данных
  // for await (const chunk of req) {
  //   buffers.push(chunk); // добавляем в буфер все полученные данные
  // }

  // const reqest = Buffer.concat(buffers).toString();
  // console.log("reqest: ");
  // // console.log(typeof reqest);
  // const { NameList: name, masList: mas_elements } = reqest;
  // console.log("name");
  // console.log(name);
  // console.log("mas_elements");
  // console.log(mas_elements);

  console.log("req: ");
  console.log(req);
  console.log("req.body");
  console.log(req.body);
  res.json("ok");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
