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
    cursor.execute(sql, (datetime.today().strftime("%Y-%m-%d")))
    # cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    conn.close()

    return result

# db 맞춤법 검사기 돌려서 update
def update_db(sql, sql_keyword, id):
    table = 'missing_person'
    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')
    result = []
    keyword = []

    for col in id:
        if(col == id[0]) :
            continue
        spell = spellCheck.spellCehck_Busan(col)
        result.append(spell)
        keyword.extend(spellCheck.keyword_analysis(spell))

    print('result', result, id[0])

    spellCheck.coordinate_change(result[0], table)

    print('keyword', keyword)
    try:
        cursor = conn.cursor()
        cursor.execute(sql, (result[0], result[1], result[2], result[3], result[4], id[0]))
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
def missing_found_update():

    # found_article
    sql_select_found = "select name, safeLocation, foundLocation, category, description from found_article whrere update_day = %s"
    sql_update_found = "update found_article set name=%s, safeLocation=%s, foundLocation=%s, category=%s, description=%s where found_id=%s"
    sql_insert_keyword_found = "insert into keyword (keyword, found_id) values (%s, %s)"

    result_df = pd.DataFrame(selectDB(sql_select_found))
    for found in result_df.values:
        update_db(sql_update_found, sql_insert_keyword_found, found)


start = time.time()
missing_found_update()
end = time.time()

sec = (end - start)
result = timedelta(seconds=sec)
print(result)
