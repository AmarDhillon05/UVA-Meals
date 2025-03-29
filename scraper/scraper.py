
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

import time
# import requests
import json
#TRACK UR FUCKING CALORIES !!!

service = Service(executable_path="/Applications/HackProj/chromedriver")

options = webdriver.ChromeOptions()
# options.add_argument("--headless")  
options.add_argument("--disable-gpu")  # Recommended for headless mode
options.set_capability("goog:loggingPrefs", {"performance": "ALL"})  # Enable Network Logs
driver = webdriver.Chrome(service=service, options=options)

driver.get("https://virginia.campusdish.com/LocationsAndMenus/ObservatoryHillDiningRoom")
wait = WebDriverWait(driver, 5)

# driver.execute_script("window.MAX_ELEMENTS = 9999;")

# logs = driver.get_log("performance")

# Function to fetch data for a given "skip" value
# def fetch_data(skip):
#     # Format url with given skip value
#     response = requests.get(API_URL.format(skip))
    
#     if response.status_code == 200:
#         data = response.json().get("value", [])
        
#         # Extract only relevant fields for each club in the current data dictionary
#         extracted_clubs = [
#             {
#                 "Name": club.get("Name", "N/A"),
#                 "Summary": club.get("Summary", "N/A"),
#                 "Description": club.get("Description", "N/A"),
#                 "CategoryNames": club.get("CategoryNames", [])
#             }
#             for club in data
#         ]
#         return extracted_clubs
#     else:
#         print(f"Error {response.status_code}: {response.text}")
#         return []
    

# # Function to scrape club information
# def scrape_clubs():
#     clubs = []
#     # Fetch 10 clubs at a time, up to 1000 clubs
#     skips = list(range(0, 1000, 50))

#     # Use ThreadPoolExecutor to send multiple requests at once
#     with ThreadPoolExecutor(max_workers=30) as executor:
#         # Automatically assigns each value of skips to fetch_data
#         results = executor.map(fetch_data, skips)

#     # Combine all the clubs extracted from multiple threads
#     clubs = [club for result in results for club in result]

#     # Save to a JSON file
#     json_file = "clubs.json"
#     with open(json_file, "w") as f:
#         json.dump(clubs, f, indent=4)
    
#     print(f"Extracted {len(clubs)} clubs.")

#     return json_file

WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "HeaderItem")))

# Define a function to scrape club information
def scrape_meals():
    meals = []
    meal_elements = driver.find_elements(By.CLASS_NAME, "HeaderItem")
    print(len(meal_elements))
    for i in range(len(meal_elements)):
        try:
            # Re-fetch the meal element inside the loop to avoid stale reference
            meal_elements = driver.find_elements(By.CLASS_NAME, "HeaderItem")
            meal = meal_elements[i]

            print(f"Processing meal {i + 1}: {meal.text}")

            # Scroll into view
            driver.execute_script("arguments[0].scrollIntoView();", meal)
            time.sleep(1)  # Allow time for elements to settle

            # Click the meal using JavaScript to avoid interception
            driver.execute_script("arguments[0].click();", meal)
            time.sleep(2)  # Wait for modal to open

            # Get page source **AFTER** clicking the meal
            html = driver.page_source
            soup = BeautifulSoup(html, "html.parser")

            # Extract nutrition information
            nutrition_info = {}
            for li in soup.find_all("li", {"data-nesting": "1"}):
                key_element = li.find(text=True, recursive=False)  # Get only the direct text
                value_span = li.find("span")  # Get corresponding <span> value

                key = key_element.strip() if key_element else "Unknown"
                value = value_span.text.strip() if value_span else "N/A"

                nutrition_info[key] = value

            # Print extracted nutrition data
            print(f"\n🍽️ Meal: {meal.text}")
            for nutrient, value in nutrition_info.items():
                print(f"{nutrient}: {value}")

            meals.append({"name": meal.text, "nutrition": nutrition_info})

            # Click the close button (X) to return
            close_button = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "sc-eDPEul.ldupur"))
            )
            driver.execute_script("arguments[0].click();", close_button)
            time.sleep(2)  # Allow modal to close before next iteration

        except Exception as e:
            print(f"Error processing meal {i + 1}: {e}")

    with open("nutrition_info.json", "w") as json_file:
        json.dump(meals, json_file, indent=4)

    print("\n✅ Nutrition data saved to 'nutrition_info.json'.")







        
    # Each meal card on the page has this class id
    # sc-kdBSHD gobkAf ProductCard
    
    # while True:
    #     # Check if the button exists before waiting
    #     if not driver.find_elements(By.CLASS_NAME, "sc-kdBSHD gobkAf ProductCard"):
    #         print("No more 'Load More' button.")
    #         break  
    #     # Click the load button
    #     try:
    #         load_more_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "outlinedButton")))
    #         load_more_button.click()
            
    #     # If an error occurs during loading
    #     except Exception as e:
    #         print(f"Error clicking load: {e}" )
    #         break
      

    # Parsing all clubs
    # html = driver.page_source
 
    # driver.quit()
    # # Switch to using BeautifulSoup for faster html parsing
    # soup = BeautifulSoup(html, "html.parser")
    # meal_cards = soup.find_all("div", class_="ProductCard")
    # # club_elements = driver.find_elements(By.XPATH, '//div[contains(@class, "MuiCard-root")]')
    # print(meal_cards)

    # for meal in meal_cards:
    #     try:
    #         name = meal.find("div", style=lambda value: value and "font-size: 1.125rem" in value).text.strip()
    #         description = meal.find("p", class_="DescriptionExcerpt").text.strip()

    #         # name = club.find(By.XPATH, './/div[@style[contains(.,"font-size: 1.125rem")]]').text.strip()
    #         # description = club.find(By.XPATH, './/p[contains(@class, "DescriptionExcerpt")]').text.strip()

    #         meals.append({
    #             "name": name,
    #             "description": description
    #         })
    #     except Exception as e:
    #         print(f"Error extracting club details: {e}")
    #         continue


    # Save to JSON file
    # with open("clubs.json", "w") as f:
    #     json.dump(clubs, f, indent=4)
    
    # driver.quit()


# Defining main function
def main():
    scrape_meals()



if __name__=="__main__":
    main()
