import './index.css'

const Dish = props => {
  const {dish, count, onUpdateCount} = props
    const {dishType,dishAvailability}=dish

  const hasCustomization = dish.addonCat && dish.addonCat.length > 0

  const onClickIncre = () => {
    onUpdateCount(dish.dishId, +1)
  }
  const onClickDres = () => {
    onUpdateCount(dish.dishId, -1)
  }
  return (
    <div className="dish-card">
       <div
        className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''} `}
      >
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="details">
        <h1>{dish.dishName}</h1>
        <p>
          {dish.dishCurrency} {dish.dishPrice}
        </p>
        <p>{dish.dishDescription}</p>
        {hasCustomization &&(
          <p className="custom-text">Customizations available</p>
          ) }
{dishAvailability && (
        <div className="quantity-button">
          <button className="btn-text" type="button" onClick={onClickDres}>
            -
          </button>
          <span className="btn-text">{count}</span>
          <button className="btn-text" type="button" onClick={onClickIncre}>
            +
          </button>
        </div>)}
 {!dishAvailability && (<p>Not available</p>)
      </div>
      <p className="calories-text">{dish.dishCalories} calories</p>
      <img src={dish.dishImage} alt={dish.dishName} className="dish-image" />
    </div>
  )
}

export default Dish
