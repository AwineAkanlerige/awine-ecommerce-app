import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'Awine',
      email: 'pakuentgh@gmail.com',
      password: bcrypt.hashSync('1234567'),
      isAdmin: true,
    },
    {
      name: 'Nina',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Fruit Basket',
      slug: 'fruit-basket',
      category: 'Baskets',
      image: '/images/a1.jpg', // 679px × 829
      price: 20,
      countInStock: 100,
      brand: 'Winaka',
      rating: 4.5,
      numReviews: 21,
      description: 'High quality handwoven basket from Winaka Limited',
    },
    {
      //_id: '2',
      name: 'U Shopper',
      slug: 'u-shopper',
      category: 'Basket',
      image: '/images/a2.jpg',
      price: 50,
      countInStock: 0,
      brand: 'Bolga Baskets',
      rating: 4.0,
      numReviews: 12,
      description:
        'High quality handwoven multi-purpose basket from Winaka Limited',
    },
    {
      // _id: '3',
      name: 'Black Soap',
      slug: 'black-soap',
      category: 'Soaps',
      image: '/images/a11.jpg',
      price: 15,
      countInStock: 150,
      brand: 'Winaka Soaps',
      rating: 4.5,
      numReviews: 14,
      description:
        'Quality organic black soap for your skin protection from wrinkles, skin rashes, pimples. It smoothens your body and gives your skin a natural beautiful tone.',
    },
    {
      //_id: '4',
      name: 'Oval Basket',
      slug: 'oval-basket',
      category: 'Baskets',
      image: '/images/a13.jpg',
      price: 65,
      countInStock: 50,
      brand: 'Winaka Baskets',
      rating: 4.5,
      numReviews: 19,
      description: 'High quality handwoven round basket from Winaka Limited',
    },
  ],
};
export default data;
