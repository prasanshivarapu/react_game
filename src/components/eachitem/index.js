import './index.css'

const Eachitem = props => {
  const {happy, todo} = props
  const {imageUrl, thumbnailUrl} = happy

  const btn = () => {
    todo(thumbnailUrl)
  }

  return (
    <div>
      <button type="button" className="btn">
        <img className="imageurl" src={imageUrl} alt="avatar" onClick={btn} />
      </button>
    </div>
  )
}

export default Eachitem
