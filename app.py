from flask_cors import CORS
from flask import Flask, jsonify
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)
df = pd.read_csv("product.csv")
features = df[['category', 'gender', 'color', 'occasion', 'price_range', 'fabric']]
encoder = OneHotEncoder()
feature_matrix = encoder.fit_transform(features)
similarity_matrix = cosine_similarity(feature_matrix)

@app.route("/recommend/<int:product_id>")
def recommend_api(product_id):
    idx = df.index[df['product_id'] == product_id][0]
    scores = list(enumerate(similarity_matrix[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    product_indices = [i[0] for i in scores[1:6]]
    result = df.iloc[product_indices][['product_id', 'name']].to_dict(orient="records")
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
