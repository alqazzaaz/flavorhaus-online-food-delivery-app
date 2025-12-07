export const calculateCartTotals = (cartItems, quantities) => {
  const subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );
  const shipping = subtotal === 0 ? 0.0 : 3;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};
