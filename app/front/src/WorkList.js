import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CSS/WorkList.css";
function WorkList(props) {
  let [wList] = props.List;
  let [inpNewElem, setinpNewElem] = useState("");
  let [ChakedOpt, setOptions] = useState([]);

  function AddElementList(event) {
    event.preventDefault();
    if (inpNewElem !== "") {
      props.ChangeList(wList.name, inpNewElem.trim());
      setinpNewElem("");
    }
    if (ChakedOpt.length > 0) {
      ChakedOpt.forEach((element) => {
        if (element !== "") {
          props.ChangeList(wList.name, element);
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
      props.CopyDeliteList(newName, event.target.innerText, wList.mas_elements);
    }
  }

  let newList = "";
  let list = wList.mas_elements.map((item, index) => {
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
        <div
          className="RemBut"
          onClick={() => props.RmListElement(wList.name, index)}
        >
          Del
        </div>

        <input
          className="BayCheck"
          type="checkbox"
          checked={item.bay_state}
          onChange={() => props.BayItem(wList.name, index)}
        />
      </li>
    );
  });
  let BaseOptions = props.BaseList.map((item, index) => {
    // console.log(props.BaseList);
    return <option key={index}>{item.ElementName}</option>;
  });

  return (
    <div>
      
      <h2 onClick={RenameList}>{wList.name}</h2>
      <div>
        <div className="nav_blk">
          {/* <span className="nav_button" onClick={() => props.setWorkList(false)}>
            Списки
          </span> */}
          <span
            className="nav_button"
            onClick={props.SaveList.bind(null, wList.name, wList.mas_elements)}
          >
            Сохранить на сервере
          </span>
        </div>

        <form
          id="AddForm"
          onSubmit={
            AddElementList
            //(event) => props.CangeList(event, wList.name, inpNewElem)
          }
        >
          <select
            id="BaseListSelect"
            onChange={CheckOption}
            multiple="1"
            size="1"
          >
            {BaseOptions}
          </select>

          <input
            id="DirectInput"
            value={inpNewElem}
            onChange={(event) => setinpNewElem(event.target.value)}
          />
          <button className="nav_button" type="submit">
            Добавить
          </button>
        </form>
      </div>

      <ul>{wList.mas_elements !== [] ? list : newList}</ul>
    </div>
  );
}

WorkList.propTypes = {
  props: PropTypes.object,
};
export default WorkList;
