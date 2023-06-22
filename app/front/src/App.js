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
          setBaseList(result.baseList);
          setLists(result.allList);
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
    setList(Lists.filter((List) => List.name === ListName));
    setWorkList((work_list_visible = true));
  }
  async function RemoveList(ListName) {
    setLists(Lists.filter((List) => List.name !== ListName));
    let response = await fetch("/rmlist", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: `"${ListName}"`,
    });
    console.log("ListName: ", ListName);
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
    // let dataStr = "";
    // masList.forEach((element) => {
    //   dataStr += element.ElementName + "," + element.bay_state + "\n";
    // });
    let query = { NameList, masList };

    let response = await fetch("/savelist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          item.mas_elements[IndexElement].bay_state =
            !item.mas_elements[IndexElement].bay_state;
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
