import {useState} from "react";
import { createUseStyles } from 'react-jss'

import Header from './Header'

const useStyles = createUseStyles({
  constainer: {
    padding: '15px 25px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    marginBottom: '15px',
    minHeight: '100px',
    borderRadius: '12px'
  },
  
  textarea: {
    border: '0',
    background: 'none',

    '&:focus': {
      outline: 'none'
    }
  },
  
})

const Card = ({ deleteCard, data, updateCard })=> {
  const classes = useStyles()
  const [ description, setDescription ] = useState(data.description)
  const [ title, setTitle ] = useState(data.title)

  const dragStart = e => {
    e.dataTransfer.setData("card", JSON.stringify(data));
    setTimeout(() => {
      e.target.style.visibility = "hidden"
    }, 1)
  };

  const dragOver = e => e.preventDefault()

  const onDragEnd = e => {
    console.log('drag end')
    e.target.style.visibility = "visible"
  }

  const handleChangeDesc = e => {
    setDescription(e.target.value)
    // const updatedData = {...data, description }
    updateCard('description', e.target.value, data.id)
  }

  const handleChangeTitle = e => {
    setTitle(e.target.value)
    // const updatedData = {...data, description }
    updateCard('title', e.target.value, data.id)
  }

  const hadleDelete = () => deleteCard(data.id)

  return (
    <div
      className={classes.constainer}
      draggable={true}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDragEnd={onDragEnd}
    >
      <Header value={title} handleChange={handleChangeTitle} handleDelete={hadleDelete} />
      <textarea className={classes.textarea} onChange={handleChangeDesc} value={description} />
    </div>
  );
};

export default Card;
