const Filter = ({ state, setState }) => {
  return (
    <div>
      filter shown with <input value={state} onChange={(event) => { setState(event.target.value) }} />
    </div>
  )
}
export default Filter
