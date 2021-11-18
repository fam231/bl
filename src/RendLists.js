import React from "react";
import PropTypes from "prop-types";
import "./CSS/RendLists.css";

function RendLists({ Lists, ShowList, AddNewList }) {
  let ListOfList = Lists.map((item, index) => {
    // console.log(item.name);
    let liPrevivs = item.mas_elements.map((elem, index) => {
      return (
        <li key={index} className="liPrevivs">
          {elem.ElementName} <input type="checkbox" checked={elem.bay_state} />
        </li>
      );
    });

    return (
      <li
        className="ListsLi"
        key={index}
        onClick={ShowList.bind(null, item.name)}
      >
        <div className="NameList">{item.name}</div>
        <ul className="ulPrevivs">{liPrevivs}</ul>
      </li>
    );
  });
  return (
    <div>
      <h2>Списки:</h2>

      <button id="AddList" onClick={AddNewList}>
        Добавить
      </button>
      <ul className="ListsUl">{ListOfList}</ul>
    </div>
  );
}

RendLists.propTypes = {
  Lists: PropTypes.array,
};

export default RendLists;
