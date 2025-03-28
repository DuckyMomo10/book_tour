// avgRating.js
const calculateAvgRating = (reviews = []) => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const avgRating = totalRating / (reviews.length || 1); // Tránh chia cho 0
  return { totalRating, avgRating };
};

export default calculateAvgRating;
