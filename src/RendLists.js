import React from "react";
import PropTypes from "prop-types";
import "./CSS/RendLists.css";

function RendLists({ Lists, ShowList, AddNewList, RemoveList }) {
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
      <li className="ListsLi" key={index}>
        <div className="NameList">
          <span onClick={ShowList.bind(null, item.name)}>{item.name}</span>
          <span className="DelList" onClick={RemoveList.bind(null, item.name)}>
            Del
          </span>
        </div>
        <ul className="ulPrevivs">{liPrevivs}</ul>
      </li>
    );
  });
  return (
    <div>
      <button id="AddList" onClick={AddNewList}>
        +
      </button>
      <ul className="ListsUl">{ListOfList}</ul>
    </div>
  );
}

RendLists.propTypes = {
  Lists: PropTypes.array,
};

export default RendLists;
