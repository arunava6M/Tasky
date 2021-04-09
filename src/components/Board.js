import { useState } from "react";
import { createUseStyles } from 'react-jss'

import Header from './Header'

const useStyles = createUseStyles({
  board: {
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '10px -5px 81px -39px rgba(0,0,0,0.75)',
  
    width: '200px',
  
    backgroundColor: '#f3ecec',
  
    margin: '10px',
    padding: '15px'
  }
})

const Board = ({ team, updateBoard, children, onDrop, deleteBoard }) => {
  const classes = useStyles()
  const [ name, setName ] = useState(team.name)

  const handleDrop = e => {
    console.log('dropped')
    const cardProps = JSON.parse(e.dataTransfer.getData("card"))
    onDrop(team.id,  cardProps)
  }

  const onDragOver = (e) => {e.preventDefault(); console.log('dragged')}

  const handleChangeTitle = e => {
    setName(e.target.value)
    updateBoard( e.target.value, team.id)
  }

  const handleDelete = () => deleteBoard(team.id)

  return (
    <div
      key={team.id}
      id={team.id}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      className={classes.board}
    >
      <Header value={name} handleChange={handleChangeTitle} handleDelete={handleDelete} />
      {children}
    </div>
  )
}

export default Board
