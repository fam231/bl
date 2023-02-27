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
let listsTmp = {
  baseList: [
    { ElementName: "Апельсин", bay_state: false },
    { ElementName: "Мандарин", bay_state: false },
    { ElementName: "Яблоко", bay_state: false },
  ],
  allList: [
    {
      name: "works",
      mas_elements: [
        { ElementName: "Сходить", bay_state: false },
        { ElementName: "Заказать", bay_state: false },
        { ElementName: "Забить", bay_state: false },
      ],
    },
    {
      name: "byus",
      mas_elements: [
        { ElementName: "Апельсин", bay_state: false },
        { ElementName: "Мандарин", bay_state: false },
        { ElementName: "Яблоко", bay_state: false },
      ],
    },
    {
      name: "date",
      mas_elements: [
        { ElementName: "11", bay_state: false },
        { ElementName: "12", bay_state: true },
        { ElementName: "13", bay_state: false },
      ],
    },
  ],
};

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
        console.log("I am in default lists.allList: ", lists.allList);
        if (lists.allList.length <= 0) {
          console.log("allList Пуст добавляем первй список", element.listName);
          lists.allList.push({
            name: element.listName,
            mas_elements: [
              { ElementName: element.item, bay_state: element.state },
            ],
          });
        } else {
          lists.allList.forEach((listElem) => {
            if (listElem.name === element.listName) {
              listElem.mas_elements.push({
                ElementName: element.item,
                bay_state: element.state,
              });
            } else {
              console.log("Имя листа НЕ найдено в обьекте: ", listElem.name);
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
  console.log("lists: ");
  console.log(lists);

  return lists;
}

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

app.get("/lists", (req, res) => {
  res.json(listsTmp);
});
