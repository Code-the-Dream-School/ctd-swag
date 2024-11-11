import { useEffect, useState } from 'react';
import placeholder from './assets/placeholder.png';

function Cart({ cart, handleCloseCart, setCart }) {
  const [workingCart, setWorkingCart] = useState(cart);
  const [isFormDirty, setIsFormDirty] = useState(false);

  //resets `workingCart`
  useEffect(() => {
    if (isFormDirty) {
      return;
    }
    setWorkingCart(cart);
  }, [cart, isFormDirty]);

  function getCartPrice() {
    return workingCart
      .reduce((acc, item) => acc + item.price * item.itemCount, 0)
      .toFixed(2);
  }

  function handleUpdateField({ event, id }) {
    event.preventDefault();
    // prevent re-render if already dirty
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
    const targetProduct = cart.find((item) => item.id === id);
    const targetIndex = cart.findIndex((item) => item.id === id);
    if (!targetProduct) {
      console.error('cart error: item not found');
      return;
    }
    //reject negative values or if user deletes value
    if (event.target.value < 0 || event.target.value === '') {
      return;
    }
    // create new object instead of updating old
    const updatedProduct = {
      ...targetProduct,
      itemCount: parseInt(event.target.value, 10),
    };
    //avoid re-ordering array when updating cart item
    setWorkingCart([
      ...workingCart.slice(0, targetIndex),
      updatedProduct,
      ...workingCart.slice(targetIndex + 1),
    ]);
  }

  function handleCancel(e) {
    e.preventDefault();
    setIsFormDirty(false);
    setWorkingCart([...cart]);
  }

  function removeEmptyItems(cart) {
    return cart.filter((i) => i.itemCount !== 0);
  }

  function handleConfirm(e) {
    e.preventDefault();
    setCart([...removeEmptyItems(workingCart)]);
    setIsFormDirty(false);
  }

  return (
    <>
      <div className="cartScreen"></div>
      <div className="cartListWrapper">
        {workingCart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <form>
            <ul className="cartList">
              {workingCart.map((item) => {
                return (
                  <li className="cartListItem" key={item.id}>
                    <img src={placeholder} alt="" />
                    <h2>{item.name}</h2>
                    <div className="cartListItemSubtotal">
                      <label>
                        Count:{' '}
                        <input
                          type="number"
                          value={item.itemCount}
                          onChange={(event) =>
                            handleUpdateField({ event, id: item.id })
                          }
                        />
                      </label>
                      <p>
                        Subtotal: $
                        {(item.price * item.itemCount).toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {isFormDirty && (
              <div>
                <button onClick={handleConfirm}>Confirm Update</button>
                <button onClick={handleCancel}>Cancel Update</button>
              </div>
            )}
          </form>
        )}
        <h2>Cart Total: ${getCartPrice()}</h2>
        <button disabled={isFormDirty} onClick={handleCloseCart}>
          CloseCart
        </button>
      </div>
    </>
  );
}

export default Cart;
