const DropWrapper = ({ onDrop, children, status, className }) => {
   const allowDrop = e => e.preventDefault()

   const handleDrop = e => {
      const data = JSON.parse(e.dataTransfer.getData("item"));
      onDrop(data,  status);
   }

   return (
      <div onDragOver={allowDrop} onDrop={handleDrop} className={className}
   )
}

export default DropWrapper