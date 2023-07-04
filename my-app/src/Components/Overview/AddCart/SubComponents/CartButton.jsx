

const CartButton = ({sku, quantity, addCart, skus, size, getCart}) => {
  const handleAddCart = (event) => {
    if (sku) {
      addCart(sku.sku, quantity)
      .then((res) =>{
        console.log('ADDED TO CART', res)
        return getCart()
      })
      .then((data) => {
        console.log('GETCART DATA', data)
      })
      .catch((error) => {
        console.error('Error while adding to cart and fetching cart contents:', error);
    });
    } else {
      alert('SELECT A PROPER SIZE')
    }
  }
  const hasStock = (sku.quantity > 0)
  return (
  <div className="border border-gray-300 p-2">
    {hasStock &&
      <button className="flex justify-between w-full p-2" onClick={handleAddCart}>
      <span>Add to Cart</span>
      <span>+</span>
    </button>
    }
    {!sku &&
    <button>
      SELECT A SIZE
    </button>}
    {!hasStock && sku &&
    <button>
      Out of Stock
    </button>}

  </div>
  )
};

export default CartButton;