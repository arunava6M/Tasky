import React,{ Fragment} from "react";

const Item = ({ className, moveItem, item, setDragElement })=> {
  const dragStart = e => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    setDragElement(item)
    setTimeout(() => {
      e.target.style.visibility = "hidden"
    }, 1)
  };

  const dragOver = (e) => {
   moveItem(e.target.innerText)
    e.preventDefault()
  }

  const onDragEnd = e => {
    console.log('drag end')
    e.target.style.visibility = "visible"
  }

  return (
    <Fragment>
      <div
        className={className}
        draggable
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDragEnd={onDragEnd}
      >
        {item.title}
        {item.description}
      </div>
    </Fragment>
  );
};

export default Item;
