const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "mysql",
  // host: "127.0.0.1",
  user: "root",
  database: "bldb",
  password: "example",
});

const connection = mysql
  .createConnection({
    host: "mysql",
    // host: "127.0.0.1",
    user: "root",
    database: "bldb",
    password: "example",
    waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0,
  })
  .promise();

con.connect(function (err) {
  if (err) console.log(err);
  console.log("Connected!");
  var sql =
    "CREATE TABLE lists (listName VARCHAR(255), item VARCHAR(255), state BOOLEAN)";
  con.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("Table created");
  });
});

async function removelist(listname, res) {
  sqlReq = `DELETE FROM lists WHERE listName=${listname}`;
  console.log("sqlReq", sqlReq);
  connection
    .query(sqlReq)
    .then((answ) => {
      console.log("answ: ", answ);
      if (res) {
        res.json("deleted");
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

app.get("/lists", (req, res) => {
  ////////// Возвращает JSON строку вида:
  // {
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
  //////////
  let lists = { baseList: [], allList: [] };
  let sqlReq = "SELECT * FROM lists ";
  connection
    .query(sqlReq)
    .then((result) => {
      result[0].forEach((element) => {
        if (element.listName === "baseList") {
          lists.baseList.push({
            ElementName: element.item,
            bay_state: element.state,
          });
        } else {
          let index_list = lists.allList.findIndex(
            (item) => item.name === element.listName
          );
          if (index_list === -1) {
            // Список не найден в масиве всех листов
            lists.allList.push({
              name: element.listName,
              mas_elements: [
                { ElementName: element.item, bay_state: element.state },
              ],
            });
          } else {
            //Индекс списка найден добавляем строку списка в массив строк.
            lists.allList[index_list].mas_elements.push({
              ElementName: element.item,
              bay_state: element.state,
            });
          }
          // }
        }
      });
      res.json(lists);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/savelist", (req, res) => {
  ////////// Ждем JSON в формате:
  // {
  //   NameList: 'Тестовый список',
  //   masList: [
  //     { ElementName: 'Кофе', bay_state: false },
  //     { ElementName: 'Кефир', bay_state: true },
  //     { ElementName: 'Яблоки', bay_state: false }
  //   ]
  // }
  //////////
  let body = "";
  req.on("data", (chank) => {
    body = body + chank;
  });
  req.on("end", async () => {
    const { NameList, masList } = JSON.parse(body);

    await removelist(NameList);

    let newList = "";
    masList.forEach((element) => {
      if (element.bay_state) {
        if (newList != "") {
          newList = `${newList},("${NameList}","${element.ElementName}",1)`;
        } else {
          newList = `("${NameList}","${element.ElementName}",1)`;
        }
      } else {
        if (newList != "") {
          newList = `${newList},("${NameList}","${element.ElementName}",0)`;
        } else {
          newList = `("${NameList}","${element.ElementName}",0)`;
        }
      }
    });

    const sql = `INSERT INTO lists (listName,item,state) VALUES ${newList}`;

    connection
      .query(sql, [newList])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    res.json("ok");
  });
});

app.post("/rmlist", (req, res) => {
  ////////// Ждем JSON в формате:
  // {
  //  имялиста:""
  // }
  //////////
  let listname = "";
  req.on("data", (chank) => {
    listname = listname + chank;
  });
  req.on("end", () => {
    removelist(listname, res);
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
