import Cartitem from "../Cartitem/Cartitem";

//styles
import Wrapper from "./cart.styles";

//types

import { CartItemType } from "../App";
import React from "react";

//Props

type Props = {
  Cartitems: CartItemType[];
  addtoCart: (clickeditem: CartItemType) => void;
  removefromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ Cartitems, addtoCart, removefromCart }) => {
  const CalculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your shopping cart</h2>

      {Cartitems.length === 0 ? <p>No item in cart</p> : null}
      {Cartitems.map((item) => (
        <Cartitem
          key={item.id}
          item={item}
          addToCart={addtoCart}
          removeFromCart={removefromCart}
        />
      ))}

      <h2>Total:${CalculateTotal(Cartitems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
