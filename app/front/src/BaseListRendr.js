import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CSS/WorkList.css";
function BaseListRendr({ baseList, setbaseList, setshowBsList, SaveList }) {
  let [inpNewElem, setinpNewElem] = useState("");

  function AddToBsList() {
    let NewBsList = [];
    setbaseList(
      NewBsList.concat(inpNewElem, baseList).sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      })
    );
    setinpNewElem("");
  }
  function SaveBL() {
    SaveList("baseList", baseList);
    setshowBsList(false);
  }
  let list = "";
  if (baseList.length > 0) {
    list = baseList.map((item, index) => {
      return (
        <li className="LiProds" key={index}>
          <span className="SpanNameProd">{item}</span>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() =>
              setbaseList(baseList.filter((elem) => elem !== item))
            }
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
        </li>
      );
    });
  }

  return (
    <div>
      <h2>{"Общий список выбора"}</h2>
      <div>
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
          onClick={() => setshowBsList(false)}
        >
          Списки
        </button>
        <button
          type="button"
          className="btn m-3 btn-outline-light"
          onClick={() => SaveBL()}
        >
          Сохранить
        </button>
        <button
          className="btn m-3 btn-outline-light"
          onClick={() => AddToBsList()}
        >
          Добавить
        </button>
      </div>

      <ul className="list-group list-group-flush">{list}</ul>
    </div>
  );
}

BaseListRendr.propTypes = {
  baseList: PropTypes.array,
  setbaseList: PropTypes.func,
  setshowBsList: PropTypes.func,
  SaveList: PropTypes.func,
};
export default BaseListRendr;
