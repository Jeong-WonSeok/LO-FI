from hanspell import spell_checker
import pymysql
from sqlalchemy import create_engine

def spellCheck(text):
    text = str(text)
    spelled_sent = spell_checker.check(text)
    checked_sent = spelled_sent.checked

    return checked_sent

engine = create_engine("mysql+pymysql://ssafy:ssafy@localhost:3306/lo-fi")
conn = pymysql.connect(host = 'localhost',
                             user = 'ssafy',
                             password = 'ssafy',
                             db = 'lo-fi')

sql = "select animal_id, location, find, gender, description  from missing_animal where animal_id = 1704"

def select_df(sql, conn):
    cursor = conn.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    conn.close()

    return result

result = select_df(sql, conn)
for animal in result:
    gg = spellCheck(animal)
    print(gg)
print(result)








