import ProductCard from './ProductCard';

function ProductList({ inventory, handleAddItemToCart }) {
  return (
    <ul className="productList">
      {inventory.map((product) => {
        return (
          <ProductCard
            id={product.id}
            key={product.id}
            handleAddItemToCart={handleAddItemToCart}
            name={product.name}
            description={product.description}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
