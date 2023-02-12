import React, { useEffect, useState } from "react";
import "./CSS/App.css";
import RendLists from "./RendLists";
import WorkList from "./WorkList";

function App() {
  let [Lists, setLists] = useState([]);
  let [BaseList, setBaseList] = useState([]);
  let [work_list_visible, setWorkList] = useState(false);
  let [List, setList] = useState(null);

  useEffect(() => {
    fetch("/lists")
      .then((res) => res.json())
      .then(
        (result) => {
          // this.setState({
          //   isLoaded: true,
          //   Lists: result,
          // });
          // let baseList = "";
          // result.forEach((item) => {
          //   if (item[0] === "Base_List") {
          //     baseList = String(item[1]).split(";");
          //   }
          // });
          setBaseList(result.baseList);


          setLists(
            result.allList
              // .filter((item) => {
              //   // console.log(item);
              //   if (item[0] !== "Base_List") {
              //     return item;
              //   }
              //   return undefined;
              // })
              // .forEach((list) => {
              //   const elem = { name: list, mas_elements: [] };
              //   item[1].forEach((element) => {
              //     elem.mas_elements.push({
              //       ElementName: element.split(",")[0],
              //       bay_state:
              //         element.split(",")[1] === "true\n" ? true : false,
              //     });
              //   });
              //   return elem;
              // })
          );
          // for (const List of result) {
          // if (List[0] === "Base_List") {
          //   setBaseList(List[1]);
          //   console.log("BaseList : " + BaseList);
          // } else {
          //   let nList = {
          //     name: List[0],
          //     mas_elements: [],
          //   };
          //   for (const elem of List[1]) {
          //     const item = elem.split(",");
          //     nList.mas_elements.push({
          //       ElementName: item[0],
          //       bay_state: item[1] === "true\n" ? true : false,
          //     });
          //   }
          // Lists.push(nList);
          // }
          // setLists(Lists);
          // }
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error,
          // });
        }
      );
  }, []);

  function ShowList(ListName) {
    // console.log("List " + List);
    setList(Lists.filter((List) => List.name === ListName));
    setWorkList((work_list_visible = true));
  }
  async function RemoveList(ListName) {
    setLists(Lists.filter((List) => List.name !== ListName));
    let response = await fetch("./scripts/Remove_List.php", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(ListName),
    });

    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      // let json = await response.json();
      console.log(response.text());
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
  function CopyDeliteList(NewName, OldName, mas_elements) {
    SaveList(NewName, mas_elements);
    SaveList(OldName, []);
    setTimeout(() => {
      setTimeout(() => {}, 500);
    }, 1000);
    // setList(Lists.filter((List) => List.name === NewName));
    setLists(
      Lists.filter((list) => {
        if (list.name === OldName) {
          list.name = NewName;
          list.mas_elements = mas_elements;
        }
        return list;
      })
    );
    console.log("Lists: ", Lists);
    // setWorkList((work_list_visible = false));
  }
  async function SaveList(NameList, masList) {
    let dataStr = "";
    masList.forEach((element) => {
      dataStr += element.ElementName + "," + element.bay_state + "\n";
    });
    let query = { NameList, dataStr };

    let response = await fetch("./scripts/Save_List.php", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(query),
    });

    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      // let json = await response.json();
      // alert("Отправил")
      // console.log(response.text());
      // let lists = Lists;
      // lists.push({ name: NameList, mas_elements: masList });
      // setLists(lists);
      setWorkList(false);
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
  function ChangeList(NameList, inpNewElem) {
    setLists(
      Lists.map((element) => {
        if (element.name === NameList) {
          let elemExist = false;
          element.mas_elements.forEach((item) => {
            if (item.ElementName === inpNewElem) {
              elemExist = true;
            }
          });
          if (!elemExist) {
            element.mas_elements.push({
              ElementName: inpNewElem,
              bay_state: false,
            });
          }
          element.mas_elements.sort((a, b) => {
            if (a.ElementName > b.ElementName) {
              return 1;
            }
            if (a.ElementName < b.ElementName) {
              return -1;
            }
            return 0;
          });
        }
        return element;
      })
    );
  }
  function RmListElement(NameList, IndexElement) {
    setLists(
      Lists.map((item) => {
        if (item.name === NameList) {
          item.mas_elements.splice(IndexElement, 1);
        }
        return item;
      })
    );
  }
  function BayItem(NameList, IndexElement) {
    setLists(
      Lists.map((item) => {
        if (item.name === NameList) {
          item.mas_elements[IndexElement].bay_state = !item.mas_elements[
            IndexElement
          ].bay_state;
        }
        return item;
      })
    );
  }
  function AddNewList() {
    let date = new Date();
    var NewListName =
      date.getFullYear() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getDate() +
      "_" +
      date.getHours() +
      "." +
      date.getMinutes() +
      "." +
      date.getMilliseconds();

    Lists = Lists.concat({ name: NewListName, mas_elements: [] });
    setLists(Lists);
    setList(Lists.filter((List) => List.name === NewListName));
    setWorkList((work_list_visible = true));
  }
  return (
    <div className="RootBlk">
      {work_list_visible ? (
        <WorkList
          List={List}
          SaveList={SaveList}
          ChangeList={ChangeList}
          BayItem={BayItem}
          RmListElement={RmListElement}
          BaseList={BaseList}
          CopyDeliteList={CopyDeliteList}
          setWorkList={setWorkList}
        />
      ) : (
        <RendLists
          Lists={Lists}
          ShowList={ShowList}
          RemoveList={RemoveList}
          AddNewList={AddNewList}
          BayItem={BayItem}
        />
      )}
    </div>
  );
}
export default App;
