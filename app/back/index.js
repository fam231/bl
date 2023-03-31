const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

const connection = mysql
  .createConnection({
    host: "mysql",
    user: "root",
    database: "bldb",
    password: "example",
    waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0,
  })
  .promise();
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
  let answ = await connection
    .query(sqlReq)
    .then((result) => {
      console.log("result: ");
      console.log(result);
      result.forEach((element) => {
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
    })
    .catch((err) => {
      console.log(err);
    });
  return answ;
}

app.get("/lists", (req, res) => {
  let lists = { baseList: [], allList: [] };
  let sqlReq = "SELECT * FROM lists ";
  connection
    .query(sqlReq)
    .then((result) => {
      result[0].forEach((element) => {
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
      res.json(lists);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/saveList", async (req, res) => {
  const buffers = []; // буфер для получаемых данных

  for await (const chunk of req) {
    buffers.push(chunk); // добавляем в буфер все полученные данные
  }
  const { NameList: name, masList: mas_elements } = JSON.parse(
    Buffer.concat(buffers).toString()
  );
  console.log("name");
  console.log(name);
  console.log("mas_elements");
  console.log(mas_elements);

  let newList = [];

  mas_elements.forEach((element) => {
    let str = [name, element.ElementName, element.bay_state];
    newList.push(str);
  });

  const sql = `INSERT INTO lists (listName,	item,	state) VALUES (newList[0])`;

  connection
    .query(sql, [newList])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("newList: ");
  console.log(newList);

  res.json("ok");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
