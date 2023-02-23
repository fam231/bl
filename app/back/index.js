const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`server running op port ${PORT}`);
});

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  database: "bldb",
  password: "example",
});

function GetAllLists() {
  let lists = { baseList: [], allList: [] };
  connection.connect(function (err) {
    if (err) {
      return console.error("Ошибка: " + err.message);
    } else {
      console.log("Подключение к серверу MySQL успешно установлено");
    }
  });

  connection.query("SELECT * FROM lists", function (err, results, fields) {
    console.log(err);
    console.log(results); // собственно данные
    // console.log(fields); // мета-данные полей

    // console.log("results: " + typeof results);
    //   results:  [
    //     { listName: 'test', item: 'Яблоки', state: 0, id: 1 },
    //     { listName: 'test', item: 'Груши', state: 0, id: 2 },
    //     { listName: 'baseList', item: 'Чай', state: 0, id: 3 },
    //     { listName: 'test', item: 'Сахар', state: 0, id: 4 }
    //    ]
    results.forEach((element) => {
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
    console.log("lists: ", lists);
    return lists;
  });

  // connection.end();
}

//Роуты
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

app.get("/lists", (req, res) => {
  async function getLists() {
    let res = await GetAllLists();
    return res;
  }

  console.log("res.json(getLists()): ", res.json(getLists()));
});
