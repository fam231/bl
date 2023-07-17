import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CSS/WorkList.css";
function WorkList(props) {
  console.log("Начало WorkList", props);
  let [inpNewElem, setinpNewElem] = useState("");
  let [ChakedOpt, setOptions] = useState([]);

  let list_name = "";
  let list_list = [];
  console.log("props.bs_list: ", props.bs_list);
  if (props.bs_list) {
    list_list = props.BaseList[0].mas_elements;
    list_name = "baseList";
  } else {
    list_list = props.List[0].mas_elements;
    list_name = props.List[0].name;
  }

  function AddElementList(event) {
    event.preventDefault();
    if (inpNewElem !== "") {
      console.log("inpNewElem.trim(): ", inpNewElem.trim());
      console.log("list_name: ", list_name);
      props.ChangeList(list_name, inpNewElem.trim());

      setinpNewElem("");
    }
    if (ChakedOpt.length > 0) {
      ChakedOpt.forEach((element) => {
        if (element !== "") {
          props.ChangeList(list_name, element);
        }
      });
      setOptions([]);
    }
  }
  function CheckOption(event) {
    Array.from(event.target.children).forEach((element) => {
      if (element.selected) {
        ChakedOpt.push(element.value);
      }
    });
  }
  function RenameList(event) {
    let newName = prompt("Новое имя?");
    if (newName !== "") {
      props.CopyDeliteList(newName, event.target.innerText, list_list);
    }
  }

  // let newList = "";

  let list = list_list.map((item, index) => {
    console.log(item);
    return (
      <li
        className="LiProds"
        style={
          item.bay_state
            ? {
                textDecoration: "line-through",
                color: "red",
                // border: "1px solid red ",
              }
            : null
        }
        key={index}
      >
        <span className="SpanNameProd">{item.ElementName}</span>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => props.RmListElement(list_name, index)}
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
        {props.bs_list ? (
          <input
            className="form-check-input BayCheck"
            type="checkbox"
            checked={item.bay_state}
            onChange={() => props.BayItem(list_name, index)}
          />
        ) : (
          ""
        )}
      </li>
    );
  });

  let BaseOptions = <option></option>;
  if (props.BaseList.length > 0) {
    BaseOptions = props.BaseList[0].mas_elements.map((item, index) => {
      return <option key={index}>{item.ElementName}</option>;
    });
    console.log("BaseOptions: ", BaseOptions);
  }

  return (
    <div>
      <h2 onClick={RenameList}>{list_name}</h2>
      <div>
        <form
          id="AddForm"
          onSubmit={
            AddElementList
            //(event) => props.CangeList(event, list_name, inpNewElem)
          }
        >
          <select
            // id="BaseListSelect"
            className="form-select m-2"
            aria-label="size 1 select example"
            onChange={CheckOption}
            multiple="1"
            size="1"
          >
            {BaseOptions}
          </select>
          {/* <input
            
            aria-describedby="basic-addon1"
          /> */}

          <input
            // id="DirectInput"
            type="text"
            className="form-control m-2"
            value={inpNewElem}
            onChange={(event) => setinpNewElem(event.target.value)}
          />
          <button
            type="button"
            className="btn m-3 btn-outline-light"
            onClick={() => props.setWorkList(false)}
          >
            Списки
          </button>
          <button
            type="button"
            className="btn m-3 btn-outline-light"
            onClick={props.SaveList.bind(null, list_name, list_list)}
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
  props: PropTypes.object,
};
export default WorkList;
