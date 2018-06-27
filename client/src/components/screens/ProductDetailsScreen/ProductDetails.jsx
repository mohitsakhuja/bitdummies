import React from 'react'
import propTypes from 'prop-types'

const ProductDetails = ({ product }) => (
  <div>
    <h3>Product Name</h3>
    <p>$49.99</p>
    {console.log(product)}
    <hr />
    <h6>Select Size</h6>
    <div className="col-md-2 d-flex justify-content-between">
      <button className="btn btn-xs btn-outline-dark rounded-circle">S</button>
      <button className="btn btn-xs btn-outline-dark rounded-circle">M</button>
      <button className="btn btn-xs btn-outline-dark rounded-circle">L</button>
    </div>
    <hr />
    <button className="btn btn-success">Next &#8594;</button>
    <hr />
    <h6 className="text-muted">Product Details</h6>
    <p>Lorem ipsum dolor sit amet.</p>
  </div>
)

ProductDetails.propTypes = {
  product: propTypes.shape({
    name: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    size: propTypes.string.isRequired,
    quantityAvailable: propTypes.number.isRequired,
    description: propTypes.string.isRequired,
    actualPrice: propTypes.number.isRequired,
    discount: propTypes.number.isRequired,
    tax: propTypes.number.isRequired,
    imagePath: propTypes.arrayOf(propTypes.string).isRequired,
    delicacy: propTypes.string.isRequired,
  }).isRequired,
}

export default ProductDetails
