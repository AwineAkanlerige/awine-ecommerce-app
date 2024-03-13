import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function ProCard(props) {
  const product = props;
  let stock;
  if (product.countInStock === 0) {
    stock = 'Sold Out';
  } else {
    stock = 'On Sale';
  }

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, the product is currently out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card style={{ padding: '7px' }}>
      {stock && <div className="stockInfo">{stock}</div>}
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title className="span">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
      </Card.Body>
      <Card.Text>${product.price}</Card.Text>
      {product.countInStock === 0 ? (
        <Button disabled variant="light">
          Out of Stock
        </Button>
      ) : (
        <Button
          style={{ backgroundColor: '#ff006a' }}
          onClick={() => addToCartHandler(product)}
        >
          Add to Cart
        </Button>
      )}
    </Card>
  );
}

export default ProCard;
