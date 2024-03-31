import React, { useEffect, useState } from "react";
import "./CSS/App.css";
import RendLists from "./RendLists";
import WorkList from "./WorkList";
import BaseListRendr from "./BaseListRendr";

function App() {
  let [Lists, setLists] = useState([
    // {
    //   name: "2023.6.22_12.1.356",
    //   mas_elements: [
    //     {
    //       ElementName: "Чай",
    //       bay_state: 0,
    //     },
    //   ],
    // },
  ]);
  let [baseList, setbaseList] = useState(["Апельсин", "Мандарин", "Яблоко"]);
  let [work_list_visible, setWorkList] = useState(false);
  let [List, setList] = useState(null);
  let [showBsList, setshowBsList] = useState(false);

  useEffect(getLists, []);

  function getLists() {
    fetch("/lists")
      .then((res) => res.json())
      .then(
        (result) => {
          setbaseList(result.baseList);
          console.log("result.baseList: ", result.baseList);
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
  }

  function ShowList(ListName) {
    if (ListName !== "baseList") {
      setList(Lists.filter((List) => List.name === ListName)[0]);
    }
    setWorkList(true);
  }

  async function RemoveList(NameList) {
    setLists(Lists.filter((List) => List.name !== NameList));
    let response = await fetch("/rmlist", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ NameList }),
    });
    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      // let json = await response.json();
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
  function CopyDeliteList(NewName, OldName, mas_elements) {
    RemoveList(OldName);
    SaveList(NewName, mas_elements);
  }
  async function SaveList(NameList, masList) {
    let query = { NameList, masList };

    let response = await fetch("/savelist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      let json = await response.json();
      // alert("Отправил")
      // let lists = Lists;
      // lists.push({ name: NameList, mas_elements: masList });
      if (json.allList) {
        setLists(json.allList);
        setWorkList(false);
      } else {
        setLists([]);
        console.log(json.state);
      }

      // getLists();
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
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

    setLists(Lists.concat({ name: NewListName, mas_elements: [] }));
    setList({ name: NewListName, mas_elements: [] });
    setWorkList((work_list_visible = true));
  }
  return (
    <div className="RootBlk">
      {work_list_visible ? (
        <WorkList
          List={List}
          setList={setList}
          SaveList={SaveList}
          BayItem={BayItem}
          RmListElement={RmListElement}
          baseList={baseList}
          CopyDeliteList={CopyDeliteList}
          setWorkList={setWorkList}
        />
      ) : showBsList ? (
        <BaseListRendr
          baseList={baseList}
          setbaseList={setbaseList}
          SaveList={SaveList}
          setshowBsList={setshowBsList}
        />
      ) : (
        <RendLists
          Lists={Lists}
          ShowList={ShowList}
          RemoveList={RemoveList}
          AddNewList={AddNewList}
          BayItem={BayItem}
          setshowBsList={setshowBsList}
        />
      )}
    </div>
  );
}
export default App;
