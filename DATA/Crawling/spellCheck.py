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
import os
from dotenv import load_dotenv
import re

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
    reg = re.compile(r'[a-zA-Z]')
    response = requests.post('http://164.125.7.61/speller/results', data={'text1': text})

    data = response.text.split('data = [', 1)[-1]
    data = data.rsplit('];')[0]
    try:
        data = json.loads(data)
        for err in data['errInfo']:
            if(reg.match(err['orgStr'])):
                text = text
            elif(len(err['candWord'].split('|')) == 1):
                text = text.replace(str(err['orgStr']), str(err['candWord']))
                if(err['candWord']==""):
                    text = err['orgStr']

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


def coordinate_change_dt(text):
    load_dotenv(verbose=True)
    api_key = os.getenv("API_KEY")
    text = spellCehck_Busan(text)
    keyword = map_keyword_analysis(text);
    text = " ".join(keyword)
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json?'

    while (1):
        params = {"query": text}
        headers = {"Authorization": "KakaoAK " + api_key}
        places = requests.get(url, params=params, headers=headers)
        if (len(text) == 0):
            coordinate = "null"s
            break
        else:
            try:
                coordinate = places.json()['documents'][0]
                break
            except:
                # print(text.split(" ")[:-1])
                text = " ".join(text.split(" ")[:-1])

    # print('경도', coordinate['x'])
    # print('위도', coordinate['y'])

    return coordinate

def coordinate_change(sql, text, table, id):
    load_dotenv(verbose=True)
    api_key = os.getenv("API_KEY")
    print(text)

    text = spellCehck_Busan(text)
    keyword = map_keyword_analysis(text);
    text = " ".join(keyword)
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json?'

    conn = pymysql.connect(host='localhost',
                           user='ssafy',
                           password='ssafy',
                           db='lo-fi')
    print(id)
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
            # print(text.split(" ")[:-1])
            text = " ".join(text.split(" ")[:-1])
    # print('경도', coordinate['x'])
    # print('위도', coordinate['y'])
    print(table)

    if(coordinate != "null"):

        cursor = conn.cursor()
        cursor.execute(sql, (coordinate['x'], coordinate['y'], id))
        conn.commit()
        conn.close()


# start = time.time()
# missing_animal_update()
# end = time.time()
#
# sec = (end - start)
# result = timedelta(seconds=sec)
# print(result)

print(spellCehck_Busan('내용 계산1파출소에서는 [2022.09.27] [kangol Nike 남성용 검정색 지갑 (블랙(검정)색)]을 습득/보관 하였습니다.분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에방문하시어 보관물품을 수령하시기 바랍니다.특이사항 : 없음'))



# 키워드 분석
# keyword_analysis("아이폰13 3단지")












