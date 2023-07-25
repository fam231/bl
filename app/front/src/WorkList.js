import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CSS/WorkList.css";
function WorkList({
  List,
  setList,
  SaveList,
  BayItem,
  RmListElement,
  baseList,
  CopyDeliteList,
  setWorkList,
}) {
  let [inpNewElem, setinpNewElem] = useState("");
  let [ChakedOpt, setOptions] = useState([]);

  function AddElementList(event) {
    event.preventDefault();
    let List_mas = [];
    // Проверим есть ли данные в инпуте
    if (inpNewElem !== "") {
      List_mas.push({
        ElementName: inpNewElem.trim(),
        bay_state: false,
      });
      setinpNewElem("");
    }
    //Проверим есть ли выбранные опции общего списка
    if (ChakedOpt.length > 0) {
      List_mas = List_mas.concat(ChakedOpt);
      setOptions([]);
    }
    //Удалим дублирующиеся элементы
    if (List.mas_elements.length > 0) {
      let List_tmp = [];
      List_mas.forEach((el) => {
        let elem_exist = false;
        List.mas_elements.forEach((elem) => {
          if (el.ElementName === elem.ElementName) {
            elem_exist = true;
          }
        });
        if (!elem_exist) {
          List_tmp.push(el);
        }
      });
      List_mas = List.mas_elements.concat(List_tmp);
    }

    //Если какие то данные были добавленны запишем их в рабочий список
    if (List_mas.length > 0 && List_mas !== undefined) {
      setList({ name: List.name, mas_elements: List_mas });
    }
  }

  function CheckOption(event) {
    let Cheked_List = [];
    Array.from(event.target.children).forEach((element) => {
      if (element.selected) {
        Cheked_List.push({ ElementName: element.value, bay_state: false });
      }
    });
    setOptions(Cheked_List);
  }

  function RenameList(event) {
    let newName = "";
    if ((newName = prompt("Новое имя?"))) {
      if (newName !== "") {
        CopyDeliteList(newName, event.target.innerText, List.mas_elements);
      } else {
        alert("!!!");
      }
    }
  }

  let list = "";
  if (List.mas_elements.length > 0) {
    list = List.mas_elements
      .sort((a, b) => {
        console.log(a);
        if (a.ElementName > b.ElementName) {
          return 1;
        }
        if (a.ElementName < b.ElementName) {
          return -1;
        }
        return 0;
      })
      .map((item, index) => {
        return (
          <li
            className="LiProds"
            style={
              item.bay_state
                ? {
                    textDecoration: "line-through",
                    color: "red",
                  }
                : null
            }
            key={index}
          >
            <span className="SpanNameProd">{item.ElementName}</span>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => RmListElement(List.name, index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
              </svg>
            </button>
            <input
              className="form-check-input BayCheck"
              type="checkbox"
              checked={item.bay_state}
              onChange={() => BayItem(List.name, index)}
            />
          </li>
        );
      });
  }

  let BaseOptions = <option></option>;
  if (baseList.length > 0) {
    BaseOptions = baseList.map((item, index) => {
      return <option key={index}>{item}</option>;
    });
  }

  return (
    <div>
      <h2 onClick={(evant) => RenameList(evant)}>{List.name}</h2>
      <div>
        <form id="AddForm" onSubmit={AddElementList}>
          <select
            className="form-select m-2"
            aria-label="size 1 select example"
            onChange={CheckOption}
            multiple="1"
            size="1"
          >
            {BaseOptions}
          </select>

          <input
            type="text"
            className="form-control m-2"
            value={inpNewElem}
            onChange={(event) => setinpNewElem(event.target.value)}
          />
          <button
            type="button"
            className="btn m-3 btn-outline-light"
            onClick={() => setWorkList(false)}
          >
            Списки
          </button>
          <button
            type="button"
            className="btn m-3 btn-outline-light"
            onClick={SaveList.bind(null, List.name, List.mas_elements)}
          >
            Сохранить
          </button>
          <button className="btn m-3 btn-outline-light" type="submit">
            Добавить
          </button>
        </form>
      </div>

      <ul className="list-group list-group-flush">{list}</ul>
    </div>
  );
}

WorkList.propTypes = {
  List: PropTypes.array,
  setList: PropTypes.func,
  SaveList: PropTypes.func,
  BayItem: PropTypes.func,
  RmListElement: PropTypes.func,
  baseList: PropTypes.array,
  CopyDeliteList: PropTypes.func,
  setWorkList: PropTypes.func,
};
export default WorkList;
