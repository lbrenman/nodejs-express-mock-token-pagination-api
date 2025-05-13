// Generate 1000 mock items
const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}));

module.exports = data;
