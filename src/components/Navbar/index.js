import {Component} from 'react'
import {RiShoppingCart2Fill} from 'react-icons/ri'
import './index.css'

class Navbar extends Component {
  render() {
    const {count} = this.props
    return (
      <div className="navbar">
        <h1>UNI RESTRO CAFE</h1>
        <div className="cart-con">
          <RiShoppingCart2Fill className="cart-icon" />
          <span className="count">{count}</span>
        </div>
      </div>
    )
  }
}

export default Navbar
