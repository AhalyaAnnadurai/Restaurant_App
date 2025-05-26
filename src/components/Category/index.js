import './index.css'

const Category = props => {
  const {id, categories, activeId, onChangeCategory} = props
  const onClickCategory = () => {
    onChangeCategory(id)
  }
  return (
    <div>
      <li className="category-list">
        <button
          key={id}
          className={`tab-button ${activeId === id ? 'active-tab' : ''}`}
          onClick={onClickCategory}
        >
          {categories}
        </button>
      </li>
    </div>
  )
}

export default Category
