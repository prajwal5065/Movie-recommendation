export async function getRecommendations(productId) {
  const res = await fetch(`http://127.0.0.1:5000/recommend/${productId}`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
