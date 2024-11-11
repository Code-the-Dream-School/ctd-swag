import placeholder from './assets/placeholder.png';

function ProductCard({ id, name, description, handleAddItemToCart }) {
  return (
    <li className="productCard">
      <div className="productPreview">
        <img src={placeholder} alt="" />
      </div>
      <div className="productCopy">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="productButtons">
        <button onClick={() => handleAddItemToCart(id)}>Add to Cart</button>
      </div>
    </li>
  );
}

export default ProductCard;
