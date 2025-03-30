import json
import chromadb
from sentence_transformers import SentenceTransformer
import os

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_db")
chroma_client.delete_collection("meals")
meal_collection = chroma_client.get_or_create_collection("meals")

# Initialize Embedding Model
model = SentenceTransformer("all-MiniLM-L6-v2")

def load_meal_data_from_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)
def index_meals(meal_data):
    for meal in meal_data:
        # Extract the meal name
        meal_name = meal['name']
        
        # Get the nutrition details as a string
        nutrition = meal.get('nutrition', {})
        
        # Convert the nutrition dictionary to a string
        nutrition_str = ', '.join([f"{key}: {value}" for key, value in nutrition.items()])
        
        # If there is no nutrition data, fallback to a simple string
        if not nutrition_str:
            nutrition_str = f"Meal: {meal_name}"
        
        # Create the full description
        meal_desc = f"{meal_name}: {nutrition_str}"
        
        # Print for debugging
        print(f"Indexing meal: {meal_name}")
        print(f"Description: {meal_desc}")
        
        # Generate embedding for the meal description
        embedding = model.encode(meal_desc).tolist()

        # Add the meal to ChromaDB, simplifying metadata
        # Store only basic information for metadata
        metadata = {
            'name': meal_name,
            'nutrition': nutrition_str  # Using a simplified version of the nutrition info
        }
        
        meal_collection.add(
            ids=[meal_name],  # Using meal name as the unique ID
            embeddings=[embedding],
            metadatas=[metadata]  # Now passing simple metadata
        )
    
    print("Meal embeddings stored successfully!")


if __name__ == "__main__":
    # Get the path to the parent directory and append the JSON file name
    parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    json_file_path = os.path.join(parent_dir, "meal_data.json")

    # Load meal data from the JSON file
    meal_data = load_meal_data_from_json(json_file_path)
    index_meals(meal_data)
