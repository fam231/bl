import React from "react";
import PropTypes from "prop-types";
import "./CSS/RendLists.css";

function RendLists({ Lists, ShowList, AddNewList, RemoveList, BayItem }) {
  let ListOfList = Lists.map((list, index) => {
    let liPrevivs = list.mas_elements.map((elem, index) => {
      return (
        <li
          key={index}
          className="liPrevivs"
          style={
            elem.bay_state
              ? {
                  textDecoration: "line-through",
                  color: "red",
                  display: "none",
                }
              : null
          }
        >
          {elem.ElementName}
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => BayItem(list.name, index)}
            checked={elem.bay_state}
          />
        </li>
      );
    });
    if (list.name !== "baseList") {
      return (
        <li className="ListsLi" key={index}>
          <div className="NameList">
            <span onClick={ShowList.bind(null, list.name)}>{list.name}</span>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={RemoveList.bind(null, list.name)}
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
          </div>
          <ul className="ulPrevivs">{liPrevivs}</ul>
        </li>
      );
    }
  });
  return (
    <div className="bd-example m-0 border-0">
      <button
        type="button"
        className="btn m-2 btn-outline-light"
        onClick={() => ShowList("baseList")}
      >
        Редактировать список выбора
      </button>
      <button
        type="button"
        className="btn m-2 btn-outline-light"
        onClick={AddNewList}
      >
        Создать
      </button>

      <ul className="ListsUl">{ListOfList}</ul>
    </div>
  );
}

RendLists.propTypes = {
  Lists: PropTypes.array,
};

export default RendLists;
