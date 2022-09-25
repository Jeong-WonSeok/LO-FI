# pip install --upgrade pip
# pip install kiwipiepy

# from hanspell import spell_checker
import pymysql
from sqlalchemy import create_engine
import pandas as pd
import requests
import json
from kiwipiepy import Kiwi
import time
import datetime

# 맞춤법 검사기 실행 hanspell
# def spellCheck(text):
#     text = str(text)
#     spelled_sent = spell_checker.check(text)
#     checked_sent = spelled_sent.checked
#     return checked_sent

# 맞춤법 검사기 실행 부산대
def spellCehck_Busan(text):
    text = str(text)
    text = text.replace('\n', '\r\n')
    # print(text)
    response = requests.post('http://164.125.7.61/speller/results', data={'text1': text})

    data = response.text.split('data = [', 1)[-1]
    data = data.rsplit('];')[0]
    try:
        data = json.loads(data)
        for err in data['errInfo']:
            if(len(err['candWord'].split('|')) == 1):
                text = text.replace(str(err['orgStr']), str(err['candWord']))
    except:
        text = text
    return text.strip()
def keyword_analysis(text):

    text = str(text)
    # print(text)
    kiwi = Kiwi()
    kiwi_analysis = kiwi.tokenize(text, normalize_coda=True)
    keyword_result = []

    for morpheme in kiwi_analysis:
        if(morpheme.tag == 'NNG' or morpheme.tag == 'NNP' or morpheme.tag == 'SN'):
            keyword_result.append(morpheme.form)
            # print(morpheme.form, morpheme.tag)
        if(morpheme.tag == 'VA'):
            VA = {"빨갛": '빨간', "하얗" : '하얀', "까맣": '까만', "노랗": '노란', "파랗": '파란', "붉": '붉은',
                  "검": '검은', "희": '흰', "작": '작', "크": '큰', "길": '긴', "짧": '짧'}
            if(morpheme.form in VA):
                keyword_result.append(VA[morpheme.form])

    return keyword_result

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
def update_db(sql, sql_keyword, animal):


    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')
    result = []
    keyword = []

    for col in animal:
        if(col == animal[0] or col == animal[5] or col == animal[6]) :
            continue
        spell = spellCehck_Busan(col)
        result.append(spell)
        keyword.extend(keyword_analysis(spell))

    print('result', result, animal[0])
    keyword.append(animal[6].strip())
    keyword.append(animal[5].split('(')[-1].rsplit(')')[0])

    keyword = set(keyword)
    # print('keyword', keyword)
    try:
        cursor = conn.cursor()
        cursor.execute(sql, (result[0], result[1], result[2], result[3], animal[0]))
        conn.commit()
        for value in keyword:
            cursor.execute(sql_keyword, (value, animal[0]))
            conn.commit()
    except:
        pass
    finally:
        conn.close()

# missing_animal table update
def missing_animal_update():

    sql_select = "select animal_id, location, find, gender, description, name, age  from missing_animal"
    sql_update = "update missing_animal set location = %s, find = %s, gender = %s, description = %s where animal_id = %s"
    sql_insert_keyword = "insert into keyword (keyword, missing_id) values (%s, %s)"

    result_df = pd.DataFrame(selectDB(sql_select))
    for animal in result_df.values:
        update_db(sql_update, sql_insert_keyword, animal)

start = time.time()
missing_animal_update()
end = time.time()

sec = (end - start)
result = datetime.timedelta(seconds=sec)
print(result)


# 키워드 분석
# keyword_analysis("아이폰13 3단지")












