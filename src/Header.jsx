import ctdLogo from './assets/icons/mono-blue-logo.svg';
import shoppingCart from './assets/icons/shoppingCart.svg';

function Header({ cart, handleOpenCart }) {
  function getItemCount() {
    return cart.reduce((acc, item) => acc + item.itemCount, 0);
  }

  return (
    <header>
      <div className="siteBranding">
        <img src={ctdLogo} alt="Code The Dream Logo" />
        <h1>CTD Swag</h1>
      </div>
      <div className="shoppingCart">
        <button type="button" onClick={handleOpenCart}>
          <img src={shoppingCart} alt="" />
          <p className="cartCount">{getItemCount()}</p>
        </button>
      </div>
    </header>
  );
}

export default Header;
