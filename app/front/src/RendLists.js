import React from "react";
import PropTypes from "prop-types";
import "./CSS/RendLists.css";

function RendLists({ Lists, ShowList, AddNewList, RemoveList, BayItem }) {
  let ListOfList = Lists.map((list, index) => {
    console.log(list.name);
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
          {elem.ElementName}{" "}
          <input
            type="checkbox"
            onChange={() => BayItem(list.name, index)}
            checked={elem.bay_state}
          />
        </li>
      );
    });

    return (
      <li className="ListsLi" key={index}>
        <div className="NameList">
          <span onClick={ShowList.bind(null, list.name)}>{list.name}</span>
          <span className="DelList" onClick={RemoveList.bind(null, list.name)}>
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
