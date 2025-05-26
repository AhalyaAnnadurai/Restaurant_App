import {Component} from 'react'
import Navbar from './components/Navbar'
import Category from './components/Category'
import Dish from './components/Dish'
import './App.css'


const convertDishToCamelCase = eachdish => ({
  dishId: eachdish.dish_id,
  dishName: eachdish.dish_name,
  dishPrice: eachdish.dish_price,
  dishImage: eachdish.dish_image,
  dishCurrency: eachdish.dish_currency,
  dishCalories: eachdish.dish_calories,
  dishDescription: eachdish.dish_description,
  dishAvailability: eachdish.dish_availability,
  dishType: eachdish.dish_type,
  addonCat: eachdish.addonCat,
})
const convertCategoryToCamelCase = eachcategory => ({
  menuCategory: eachcategory.menu_category,
  menuCategoryId: eachcategory.menu_category_id,
  menuCategoryImage: eachcategory.menu_category_image,
  CategoryDishes: eachcategory.category_dishes.map(convertDishToCamelCase),
})

class App extends Component {
  state = {
    cartCount: 0,
    category: [],
    dishes: [],
    activeCategory: '',
    dishCounts: [],
  }

  componentDidMount() {
    this.fetchMenu()
  }

  fetchMenu = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const rawCategory = data[0].table_menu_list
    const category = rawCategory.map(convertCategoryToCamelCase)
    const firstId = category[0].menuCategoryId
    this.setState({
      category,
      activeCategory: firstId,
      dishes: category[0].CategoryDishes,
    })
  }

  onChangeCategory = id => {
    const {category} = this.state
    const selected = category.find(cat => cat.menuCategoryId === id)
    this.setState({
      activeCategory: id,
      dishes: selected.CategoryDishes,
    })
  }

  updateDishCount = (dishId, change) => {
    this.setState(prev => {
      const prevCount = prev.dishCounts[dishId] || 0
      const newCount = Math.max(0, prevCount + change)
      const newDishCount = {...prev.dishCounts, [dishId]: newCount}
      const cartCount = Object.values(newDishCount).reduce((a, b) => a + b, 0)
      return {
        dishCounts: newDishCount,
        cartCount,
      }
    })
  }

  render() {
    const {cartCount, category, activeCategory, dishes, dishCounts} = this.state
    return (
      <div>
        <Navbar count={cartCount} />
        <ul className="category-section">
          {category.map(cat => (
            <Category
              key={cat.menuCategoryId}
              id={cat.menuCategoryId}
              categories={cat.menuCategory}
              activeId={activeCategory}
              onChangeCategory={this.onChangeCategory}
            />
          ))}
        </ul>
        <hr />
        <div>
          {dishes.map(dish => (
            <Dish
              key={dish.dishId}
              dish={dish}
              count={dishCounts[dish.dishId] || 0}
              onUpdateCount={this.updateDishCount}
            />
          ))}
        </div>
      </div>
    )
  }
}
export default App
