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

    conn = pymysql.connect(host='j7b102.p.ssafy.io',
                           user='b102',
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
    conn = pymysql.connect(host='j7b102.p.ssafy.io',
                           user='b102',
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
    sql_person = "update missing_person set longitude = %s, latitude=%s where id = %s"
    spellCheck.coordinate_change(sql_person, result[0], table, id[0])

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


# missing_animal table update
def missing_person_update():

    #person
    sql_select_person = "select id, location, description, category, dress from missing_person"
    sql_update_person = "update missing_person set location = %s, descriptions = %s, category = %s, dress = %s where id = %s"
    sql_insert_keyword_person = "insert into keyword (keyword, person_id) values(%s, %s)"

    result_df = pd.DataFrame(selectDB(sql_select_person))
    for person in result_df.values:
        update_db(sql_update_person, sql_insert_keyword_person, person)


start = time.time()
missing_person_update()
end = time.time()

sec = (end - start)
result = timedelta(seconds=sec)
print(result)
