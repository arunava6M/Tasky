import "./App.css";
import { useState, useEffect } from "react";
import {createUseStyles} from 'react-jss'

import Board from "./components/Board";
import Card from "./components/Card";
import { cards, teams } from './data'

const useStyles = createUseStyles({
  button: {
    height: '40px',
    width: '100px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#7d827c',
    boxShadow: '10px 39px 81px -39px rgba(0,0,0,0.75)',
    color: '#fff',
    cursor: 'pointer',
    margin: '10px'
  },
  flexBox: {
    display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',

  width: '100%',
  height: '100vh',

  overflow: 'hidden',

  margin: '0 auto',
  padding: '1px'
  }
})

export default function App() {
  const classes = useStyles()
  const [cardsData, setCardsData] = useState([]);
  const [teamsData, setTeamsData ] =useState([])

  useEffect(() =>{
    console.log('inside useEffect')
    setCardsData(cards)
    setTeamsData(teams)
  }, []);

  const addBoard = () => {
    const count = teamsData?.length + 1
    const newBoard = {
      id: `team${count}`,
      name:   ''
    }
    setTeamsData(prevState => [...prevState, newBoard])
  }

  const onDrop = (teamId, cardProps) => {
    console.log(cardProps);
    console.log(cardsData)

    if(cardProps.teamId !== teamId){
      setCardsData( prevState => [{...cardProps, teamId},
        ...prevState.filter(el => el.id !== cardProps.id)])
    }
  };

  const deleteCard = id => {
    setCardsData(prevState => prevState.filter(el => el.id !== id))
  }

  const deleteBoard = teamId => {
    setTeamsData( prevState => prevState.filter(team => team.id !== teamId))
    setCardsData(prevState => prevState.filter(el => el.teamId !== teamId))
  }

  const addNewCard = teamId => {
    const newCard = {
      id: Math.floor(Math.random() * 100),
      teamId,
      title:  '',
      description: ''
    }
    setCardsData( prevState => [...prevState, newCard])
  }

  const updateCard = (key, input, id) => {
    setCardsData(prevState => {
      const i = prevState.findIndex(card => card.id === id)
      prevState[i][key] = input
      return prevState
    })
  }

  const updateBoard = (input ,id ) => {
    console.log(id)
    setTeamsData(prevState => {
      const i = prevState.findIndex(board => board.id === id)
      console.log(i)
      prevState[i].name = input
      return prevState
    })
  }

  return (
    <div className="App">
      <button className={classes.button} onClick={addBoard}>Add Board</button>
      <div className={classes.flexBox}>
        {teamsData.map( team => (
              <Board
                key={team.id}
                team={team}
                onDrop={onDrop}
                deleteBoard={deleteBoard}
                updateBoard={updateBoard}
              >
              {cardsData
                  .filter(card => card.teamId === team.id)
                  .map(card =>{
                    console.log('renderedcard: ', card)
                    return (
                    <Card
                      key={card.id}
                      data={card}
                      deleteCard={deleteCard}
                      updateCard={updateCard}
                    />
                  )})
              }
              <button className={classes.button} onClick={() => addNewCard(team.id)}>Add new card</button>
              </Board>
          ))
        }
      </div>
    </div>
  );
}
