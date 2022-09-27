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
from datetime import timedelta
from datetime import datetime

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
    kiwi = Kiwi()
    kiwi_analysis = kiwi.tokenize(text, normalize_coda=True)
    keyword_result = []

    for morpheme in kiwi_analysis:
        if(morpheme.tag == 'NNG' or morpheme.tag == 'NNP' or morpheme.tag == 'SN'):
            keyword_result.append(morpheme.form)
            # print(morpheme.form, morpheme.tag)
        if(morpheme.tag == 'VA'):
            VA = {"빨갛": '빨간', "하얗": '하얀', "까맣": '까만', "노랗": '노란', "파랗": '파란', "붉": '붉은',
                  "검": '검은', "희": '흰', "작": '작', "크": '큰', "길": '긴', "짧": '짧'}
            if(morpheme.form in VA):
                keyword_result.append(VA[morpheme.form])

    return keyword_result

def map_keyword_analysis(text):

    text = str(text)
    kiwi = Kiwi()
    keyword_result = []

    if(text.find('로') != -1 and text.find('으로') == -1):

        index = text.find('로')
        final_string = text[:index + 1] + "에서" + text[index+1:]
        final_arr = kiwi.tokenize(final_string, normalize_coda=True)
        for string in final_arr:
            print(string)
            if (string.tag == 'NNG' or string.tag == 'NNP' or string.tag == 'SN' or string.form == '-' or string.tag == 'SL' or string.form == '번'):
                if (string.form == '인근' or string.form == '근처' or string.form == '주변' or string.form == '부근' or string.form == '추정'):
                    continue
                keyword_result.append(string.form)
            elif(string.form == '에서'):
                continue
            else:
                return keyword_result

    else:
        morpheme = kiwi.tokenize(text, normalize_coda=True)
        for string in morpheme:
            print(string)
            if (string.tag == 'NNG' or string.tag == 'NNP' or string.tag == 'SN' or string.form == '-' or string.tag == 'SL' or string.form == '번'):
                if(string.form == '인근' or string.form == '근처' or string.form == '주변' or string.form == '부근' or string.form == '추정'):
                    continue
                keyword_result.append(string.form)
            else:
                return keyword_result


    print(keyword_result)


    return keyword_result

# # db에서 검사기 돌릴 행 가져오기
# def selectDB(sql):
#
#     conn = pymysql.connect(host='localhost',
#                            user='ssafy',
#                            password='ssafy',
#                            db='lo-fi')
#
#     cursor = conn.cursor()
#     # cursor.execute(sql, (datetime.today().strftime("%Y-%m-%d")))
#     cursor.execute(sql)
#     result = cursor.fetchall()
#     conn.commit()
#     conn.close()
#
#     return result
#
# # db 맞춤법 검사기 돌려서 update
# def update_db(sql, sql_keyword, id, table):
#
#     conn = pymysql.connect(host='localhost',
#                            user='ssafy',
#                            password='ssafy',
#                            db='lo-fi')
#     result = []
#     keyword = []
#
#     for col in id:
#         if(col == id[0] or col == id[5] or col == id[6]) :
#             continue
#         spell = spellCehck_Busan(col)
#         result.append(spell)
#         keyword.extend(keyword_analysis(spell))
#
#     print('result', result, id[0])
#     keyword.append(id[6].strip())
#     keyword.append(id[5].split('(')[-1].rsplit(')')[0])
#
#     keyword = set(keyword)
#
#     coordinate_change(result[0], table, api_key)
#
#     print('keyword', keyword)
#     try:
#         cursor = conn.cursor()
#         cursor.execute(sql, (result[0], result[1], result[2], result[3], id[0]))
#         conn.commit()
#         for value in keyword:
#             cursor.execute(sql_keyword, (value, id[0]))
#             conn.commit()
#     except:
#         pass
#     finally:
#         conn.close()
#
# """
# 분실물 : name, category, location, description
# 습득물 : name, safeLocation, foundLocation, category, description
# 실종자 : location, description, category, dress
# """
#
# # missing_animal table update
# def missing_animal_update():
#
#     #animal
#     sql_select_animal = "select animal_id, location, find, gender, description, name, age  from missing_animal where update_day = %s"
#     sql_update_animal = "update missing_animal set location = %s, find = %s, gender = %s, description = %s where animal_id = %s"
#     sql_insert_keyword_animal = "insert into keyword (keyword, animal_id) values (%s, %s)"
#     #person
#     sql_select_person = "select location, description, category, dress from missing_person"
#     sql_update_person = "update missing_person set location = %s, descriptions = %s, category = %s, dress = %s where person_id = %s"
#     sql_insert_keyword_person = "insert into keyword (keyword, person_id) values(%s, %s)"
#     # found_article
#     sql_select_found = "select name, safeLocation, foundLocation, category, description from found_article whrer update_day = %s"
#     sql_update_found = "update found_article set name=%s, safeLocation=%s, foundLocation=%s, category=%s, description=%s where found_id=%s"
#     sql_insert_keyword_found = "insert into keyword (keyword, found_id) values (%s, %s)"
#     #lost_article
#     sql_select_lost = "select lost_id, name, category, location, description from lost_article where update_day = %s"
#     sql_update_lost = "update lost_article set name=%s, category=%s, location=%s, description=%s where lost_id=%s"
#     sql_insert_keyword_lost = "insert into keyword (keyword, lost_id) values (%s, %s)"
#
#     result_df = pd.DataFrame(selectDB(sql_select_animal))
#     for animal in result_df.values:
#         update_db(sql_update_animal, sql_insert_keyword_animal, animal, "missing_animal")


def coordinate_change(text, table):
    api_key = "f1865c4489d9ec05c29359f8264f7412"

    text = spellCehck_Busan(text)
    keyword = map_keyword_analysis(text);
    text = " ".join(keyword)
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json?'

    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')

    while (1):
        params = {"query": text}
        headers = {"Authorization": "KakaoAK " + api_key}
        places = requests.get(url, params=params, headers=headers)
        if (len(text) == 0):
            coordinate = "null"
            break
        try:
            coordinate = places.json()['documents'][0]
            break;
        except:
            print(text.split(" ")[:-1])
            text = " ".join(text.split(" ")[:-1])
    print('경도', coordinate['x'])
    print('위도', coordinate['y'])
    print(table)
    if(coordinate != "null"):
        sql = "insert into %s (longitude, latitude) values (%s, %s)"

        cursor = conn.cursor()
        cursor.execute(sql, (table, str(coordinate['x']), str(coordinate['y'])))
        conn.commit()
        conn.close()


# start = time.time()
# missing_animal_update()
# end = time.time()
#
# sec = (end - start)
# result = timedelta(seconds=sec)
# print(result)


# 키워드 분석
# keyword_analysis("아이폰13 3단지")












