import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
   header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      width: '90%'
    },
    input: {
      border: '0',
      fontWeight: '600',
      fontSize: '16px',
      maxWidth: '100%',
      background: 'none',
  
      '&:focus': {
        outline: 'none'
      }
    },
    button: {
      height: '15px',
      minWidth: '15px',
      borderRadius: '50%',
      backgroundColor: '#f76157',
      padding: '2px',
      border: 'none',
      cursor: 'pointer'
    }
})

const Header = ({ handleChange, value, handleDelete, placeholder}) => {
   const classes = useStyles()
   return (
      <div className={classes.header}>
        <input className={classes.input} placeholder={placeholder} onChange={handleChange} value={value} />
        <button className={classes.button} onClick={handleDelete} />
      </div>
   )
}

export default Header
