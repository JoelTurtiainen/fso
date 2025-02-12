import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(event) => dispatch({ type: 'filter/filterChange', payload: event.target.value })} />
    </div>
  )
}

export default Filter
