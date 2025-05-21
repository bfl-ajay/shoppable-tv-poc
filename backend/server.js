const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const products = [
  { id: 1, name: 'Coffee Maker', image: '/img/coffee.png', price: 4999, scene: 10 },
  { id: 2, name: 'Mug Set', image: '/img/mug.png', price: 999, scene: 20 }
];

let orders = [];

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get products by scene
app.get('/api/products', (req, res) => {
  const scene = parseInt(req.query.scene || '10');
  res.json(products.filter(p => p.scene === scene));
});

// Place order
app.post('/api/orders', (req, res) => {
  orders.push(req.body);
  res.json({ success: true });
});

// Get analytics
app.get('/api/analytics', (req, res) => {
  res.json({ ordersCount: orders.length });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
