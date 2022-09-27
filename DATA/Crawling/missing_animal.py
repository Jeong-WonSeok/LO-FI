import spellCheck
import pymysql
from sqlalchemy import create_engine
import pandas as pd
import requests
import json
import time
from datetime import timedelta
from datetime import datetime


def selectDB(sql):

    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')

    cursor = conn.cursor()
    # cursor.execute(sql, (datetime.today().strftime("%Y-%m-%d")))
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    conn.close()

    return result

# db 맞춤법 검사기 돌려서 update
def update_db(sql, sql_keyword, id):
    table = 'missing_animal'
    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')
    result = []
    keyword = []

    for col in id:
        if(col == id[0] or col == id[5] or col == id[6]) :
            continue
        spell = spellCheck.spellCehck_Busan(col)
        result.append(spell)
        keyword.extend(spellCheck.keyword_analysis(spell))

    print('result', result, id[0])
    keyword.append(id[6].strip())
    keyword.append(id[5].split('(')[-1].rsplit(')')[0])

    keyword = set(keyword)

    spellCheck.coordinate_change(result[0], table)

    print('keyword', keyword)
    try:
        cursor = conn.cursor()
        cursor.execute(sql, (result[0], result[1], result[2], result[3], id[0]))
        conn.commit()
        for value in keyword:
            cursor.execute(sql_keyword, (value, id[0]))
            conn.commit()
    except:
        pass
    finally:
        conn.close()

"""
분실물 : name, category, location, description
습득물 : name, safeLocation, foundLocation, category, description
실종자 : location, description, category, dress
"""

# missing_animal table update
def missing_animal_update():

    #animal
    sql_select_animal = "select animal_id, location, find, gender, description, name, age  from missing_animal where update_day = %s"
    sql_update_animal = "update missing_animal set location = %s, find = %s, gender = %s, description = %s where animal_id = %s"
    sql_insert_keyword_animal = "insert into keyword (keyword, animal_id) values (%s, %s)"

    result_df = pd.DataFrame(selectDB(sql_select_animal))
    for animal in result_df.values:
        update_db(sql_update_animal, sql_insert_keyword_animal, animal)


start = time.time()
missing_animal_update()
end = time.time()

sec = (end - start)
result = timedelta(seconds=sec)
print(result)
