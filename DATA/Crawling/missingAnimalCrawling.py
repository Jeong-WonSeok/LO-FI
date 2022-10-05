# !pip install selenium
# !pip install pandas
# !pip install pymysql
# !pip install sqlalchemy
import pymysql
from sqlalchemy import create_engine
import sqlalchemy
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from datetime import datetime
import time

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

def emergency_scraping(animal_url, wd):
    try:
        emergency_animals = []

        for t in range(1, 100):
            for i in range(1, 4):
                emergency_url = wd.find_element(By.XPATH,
                                                '/html/body/div[4]/div/div/div/div[%d]/div[1]/div[%d]/div/a' % (
                                                t, i)).get_attribute('href')
                emergency_animals.append(emergency_url)


    except:
        pass
    return emergency_animals

def missing_animals_url(animal, wd):

    try:
        missing_animals = []
        totalpages = wd.find_element(By.XPATH, '/html/body/div[6]/div/div/div/p').text
        page = totalpages.split(" ")
        last = int(page[6]) + 1

        for p in range(1, last):
            url = 'http://www.angel.or.kr/index.php?code=%s&page=%d' % (animal, p)
            wd.get(url)
            for t in range(1, 6):
                for i in range(1, 5):
                    if (p == 1):
                        missing = wd.find_element(By.XPATH,
                                                  '/html/body/div[5]/div/div/div/div[%d]/div[1]/div[%d]/h3' % (
                                                  t, i)).text
                    else:
                        missing = wd.find_element(By.XPATH,
                                                  '/html/body/div[4]/div/div/div/div[%d]/div[1]/div[%d]/h3' % (
                                                  t, i)).text

                    if ("실종" in missing):
                        if (p == 1):
                            missing_url = wd.find_element(By.XPATH,
                                                          '//html/body/div[5]/div/div/div/div[%d]/div[1]/div[%d]/div/a' % (
                                                          t, i)).get_attribute('href')
                        else:
                            missing_url = wd.find_element(By.XPATH,
                                                          '//html/body/div[4]/div/div/div/div[%d]/div[1]/div[%d]/div/a' % (
                                                          t, i)).get_attribute('href')
                        missing_animals.append(missing_url)
    except:
        pass

    return missing_animals

def animals_info_scraping(animal_info_url, wd):

  idArr = wd.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div/div[2]/p').text.split("\n")[0].split("|")[2].split()
  if(len(idArr[1].split(',')) == 2) :
    id = int(idArr[1].split(',')[0] + idArr[1].split(',')[1])
  else :
    id = int(idArr[1])
  animal = wd.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div/table/tbody/tr[1]/td[2]').text
  info = animal.split('/')
  kind = info[len(info)-4]
  gender = info[len(info)-3]
  age = info[len(info)-2]
  name = info[len(info)-1]
  missingDay = wd.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div/table/tbody/tr[2]/td[2]').text
  try:
    datetime_format = "%Y-%m-%d"
    missingDay = datetime.strptime(missingDay, datetime_format).date()
  except:
    return

  location = wd.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div/table/tbody/tr[3]/td[2]').text
  description = wd.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div/table/tbody/tr[5]/td[2]').text
  description = description.replace("\n", " ")
  description = description.replace("\t", " ")

  # 이미지 클릭해 이미지로 이동
  try:
    img_url = wd.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div/div[3]/div[1]/div[1]/div/a').get_attribute('href')
    wd.get(img_url)
    img = wd.find_element(By.XPATH, '/html/body/img').get_attribute('src')
  except:
    img = ''
    pass

  datenow = datetime.today().strftime("%Y-%m-%d")
  #columns=("animal_id", "kind", "gender", "age", "name", "missing_day", "location", "description", "img", "used", "update_day", "longitude",
                                    # "latitude", "time", "user_id")
  return [id, kind, gender, age, name, missingDay, location, description, img, True, pd.to_datetime(datenow)]


def dog_url_scraping():
    wd = webdriver.Chrome('chromedriver', options=chrome_options)
    wd.implicitly_wait(3)

    dogs_url = 'http://www.angel.or.kr/index.php?code=dog'
    wd.get(dogs_url)

    dogs_df = pd.DataFrame(columns=("animal_id", "kind", "gender", "age", "name", "missing_day", "location", "description", "img", "used", "update_day"))

    emergency_dogs = emergency_scraping(dogs_url, wd)

    dogs_idx = 0
    for dog_url in emergency_dogs:
        wd.get(dog_url)
        dogs_df.loc[dogs_idx] = animals_info_scraping(dog_url, wd)
        dogs_idx += 1

    wd.get(dogs_url)
    missing_dogs_url = missing_animals_url('dog', wd)

    for dog_url in missing_dogs_url:
        wd.get(dog_url)
        dogs_df.loc[dogs_idx] = animals_info_scraping(dog_url, wd)
        dogs_idx += 1

    return dogs_df

def cat_url_scraping():
  wd = webdriver.Chrome('chromedriver', options= chrome_options)
  wd.implicitly_wait(3)
  cats_url = 'http://www.angel.or.kr/index.php?code=cat'

  wd.get(cats_url)

  cats_df = pd.DataFrame(columns=("animal_id", "kind", "gender", "age", "name", "missing_day", "location", "description", "img", "used", "update_day"))

  emergency_cats = emergency_scraping(cats_url, wd)

  cats_idx = 0
  for cat_url in emergency_cats:
    wd.get(cat_url)
    cats_df.loc[cats_idx] = animals_info_scraping(cat_url, wd)
    cats_idx += 1

  wd.get(cats_url)
  missing_cats_url = missing_animals_url('cat', wd)

  for cat_url in missing_cats_url:
    wd.get(cat_url)
    cats_df.loc[cats_idx] = animals_info_scraping(cat_url, wd)
    cats_idx += 1

  return cats_df

def other_url_scraping():
  wd = webdriver.Chrome('chromedriver', options= chrome_options)
  wd.implicitly_wait(3)
  others_url = 'http://www.angel.or.kr/index.php?code=other'

  wd.get(others_url)

  emergency_others = emergency_scraping(others_url, wd)

  others_df = pd.DataFrame(columns=("animal_id", "kind", "gender", "age", "name", "missing_day", "location", "description", "img", "used", "update_day"))
  others_idx = 0
  for other_url in emergency_others:
    wd.get(other_url)
    others_df.loc[others_idx] = animals_info_scraping(other_url, wd)
    others_idx += 1

  wd.get(others_url)
  missing_others_url = missing_animals_url('other', wd)

  for other_url in missing_others_url:
    wd.get(other_url)
    others_df.loc[others_idx] = animals_info_scraping(other_url, wd)
    others_idx += 1
  return others_df


def insert_new_animal(db_data, animal_df) :
  insert_df = pd.DataFrame(columns=("animal_id", "kind", "gender", "age", "name", "missing_day", "location", "description", "img", "used", "update_day"))
  for index, row in animal_df.iterrows():
    if(db_data.loc[db_data['animal_id'] == str(row[0])].empty) :
      insert_df = insert_df.append(pd.DataFrame({'animal_id' : [row[0]], "kind": [row[1]], 'gender': [row[2]],
                                                  'age': [row[3]], 'name': [row[4]], 'missing_day': [row[5]],
                                                  'location': [row[6]], 'description': [row[7]], 'img': [row[8]],
                                                  'used': [row[9]], 'update_day': [row[10]]}), ignore_index=True)
  return insert_df

def update_db(db_data, animal_df):
  date = datetime.today().strftime("%Y-%m-%d")
  for index, row in db_data.iterrows():
    if(animal_df[animal_df['animal_id'] == str(row[2])].empty):
      sql = "UPDATE missing_animal SET used = False, update_day = %s WHERE animal_id = %s"
      conn = pymysql.connect(host='localhost',
                             user='ssafy',
                             password='ssafy',
                             db='lo-fi')

      cursor = conn.cursor()
      cursor.execute(sql, (date, row[2]))
      conn.commit()
      conn.close()

dogs_df = dog_url_scraping()
cats_df = cat_url_scraping()
others_df = other_url_scraping()

dogs_df_clone = dogs_df
cats_df_clone = cats_df
others_df_clone = others_df

animal_df = pd.concat([dogs_df_clone, cats_df_clone])
animal_df = pd.concat([animal_df, others_df_clone])

## DB연결
engine = create_engine("mysql+pymysql://ssafy:ssafy@localhost:3306/lo-fi")

db_data = pd.read_sql_table('missing_animal', engine)

# db에 값이 없으면 append 실행
if(engine.execute("SELECT * FROM missing_animal").fetchall() is None) :
  animal_df.to_sql(name='missing_animal', con = engine, if_exists='append', index=False)
else:
  insert_df = insert_new_animal(db_data, animal_df)
  insert_df.to_sql(name='missing_animal', con =engine, if_exists = 'append', index=False)
  update_db(db_data, animal_df)