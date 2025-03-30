from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
import chromadb

# Initialize MongoDB, Sentence-BERT, and ChromaDB
client = MongoClient("mongodb+srv://sidharth_ponram:Startlink129@cluster0.lbatq.mongodb.net/hackuva?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true")
db = client["hackuva"]
meal_collection = db["menu"]
embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
chroma_client = chromadb.Client()

# Function to get meal recommendations
def recommend_meals(dietary_requirements: str):
    # Query MongoDB to extract relevant meal data
    meals = list(meal_collection.find({
        "calories": {"$lt": 600},  # Meals with fewer than 600 calories
        "protein": {"$gt": 10},    # Meals with more than 20g of protein
    }))

    # Convert query to embeddings
    query_embedding = embedding_model.encode([dietary_requirements])

    # Retrieve meals from ChromaDB collection
    collection = chroma_client.get_or_create_collection("meal_embeddings")
    results = collection.query(query_embedding, n_results=5)

    # Combine and refine meal recommendations using ChromaDB results
    recommended_meals = []
    for result in results:
        # Access metadata to get meal_id
        meal_id = result["metadata"]["meal_id"]
        meal_data = meal_collection.find_one({"_id": meal_id})
        if meal_data:
            recommended_meals.append(meal_data)

    # Return recommended meals
    return recommended_meals

# Example usage
if __name__ == "__main__":
    # Example query: dietary requirements can be any string, like "high protein low carb"
    dietary_requirements = "high protein, low carb"
    
    recommended_meals = recommend_meals(dietary_requirements)
    
    print("Recommended meals:")
    for meal in recommended_meals:
        print(meal)
