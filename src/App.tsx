import { useState } from "react";
import { useQuery } from "react-query";
import Item from "./item/item";

//  components
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import { AddShoppingCart } from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import Cart from "./Cart/cart";

//styles
import { Wrapper, StyledButton } from "./App.styles";

//types

export type CartItemType = {
  id: number;
  category: string;
  price: number;
  image: string;
  title: string;
  amount: number;
  description: string;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [CartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    `Products`,

    getProducts
  );

  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddtoCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      //is the item already in the cart
      const isIteminCart = prev.find((item) => Item.id === clickedItem.id);
      if (isIteminCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleremoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;

          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;

  if (error) return <div>something went wrong</div>;

  return (
    <Wrapper>
      <Drawer anchor="left" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          Cartitems={CartItems}
          addtoCart={handleAddtoCart}
          removefromCart={handleremoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(CartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddtoCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
