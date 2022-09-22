from hanspell import spell_checker
import pymysql
from sqlalchemy import create_engine
import pandas as pd

# 맞춤법 검사기 실행
def spellCheck(text):
    text = str(text)
    spelled_sent = spell_checker.check(text)
    checked_sent = spelled_sent.checked
    return checked_sent

# db에서 검사기 돌릴 행 가져오기
def selectDB(sql):
    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')

    cursor = conn.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    conn.close()

    return result

# db 맞춤법 검사기 돌려서 update
def update_db(sql, animal):

    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')
    result = []

    for col in animal:
        result.append(spellCheck(col))
    cursor = conn.cursor()
    cursor.execute(sql, (result[1], result[2], result[3], result[4], result[0]))
    conn.commit()
    conn.close()

# missing_animal table update
def missing_animal_update():

    sql_select = "select animal_id, location, find, gender, description  from missing_animal"
    sql_update = "update missing_animal set location = %s, find = %s, gender = %s, description = %s where animal_id = %s"

    result_df = pd.DataFrame(selectDB(sql_select))
    for animal in result_df.values:
        update_db(sql_update, animal)

missing_animal_update()














