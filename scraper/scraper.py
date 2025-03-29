
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

import time
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

logs = driver.get_log("performance")

# Define a function to scrape club information
def scrape_clubs():
    clubs = []
    
    i = 10
    while True:
        # Check if the button exists before waiting
        if not driver.find_elements(By.CLASS_NAME, "outlinedButton"):
            print("No more 'Load More' button.")
            break  
        # Click the load button
        try:
            load_more_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "outlinedButton")))
            load_more_button.click()
            
        # If an error occurs during loading
        except Exception as e:
            print(f"Error clicking load: {e}" )
            break
        
        # Debugging
        i+=10
        print(i)

    # Parsing all clubs
    html = driver.page_source
    driver.quit()
    # Switch to using BeautifulSoup for faster html parsing
    soup = BeautifulSoup(html, "html.parser")
    club_cards = soup.find_all("div", class_="MuiCard-root")
    # club_elements = driver.find_elements(By.XPATH, '//div[contains(@class, "MuiCard-root")]')


    for club in club_cards:
        try:
            name = club.find("div", style=lambda value: value and "font-size: 1.125rem" in value).text.strip()
            description = club.find("p", class_="DescriptionExcerpt").text.strip()

            # name = club.find(By.XPATH, './/div[@style[contains(.,"font-size: 1.125rem")]]').text.strip()
            # description = club.find(By.XPATH, './/p[contains(@class, "DescriptionExcerpt")]').text.strip()

            clubs.append({
                "name": name,
                "description": description
            })
        except Exception as e:
            print(f"Error extracting club details: {e}")
            continue


    # Save to JSON file
    with open("clubs.json", "w") as f:
        json.dump(clubs, f, indent=4)
    
    driver.quit()


# Defining main function
def main():
    print("HI")
    # scrape_clubs()



if __name__=="__main__":
    main()

