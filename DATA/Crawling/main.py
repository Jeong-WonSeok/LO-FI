"""
 - fast api 설치
pip install fastapi
pip install uvicorn

서버 실행 명령어 ->
uvicorn main:app --reload
"""

from typing import Optional

from fastapi import FastAPI
import spellCheck
app = FastAPI()

@app.get("/api/spellCheck/{spell}")
def spell_check(spell: Optional[str] =None):
    text = spellCheck.spellCehck_Busan((spell))

    return str(text)

@app.get("/api/keyword/{keyword}")
def read_keyword(keyword: Optional[str] = None):
    text = spellCheck.spellCehck_Busan(keyword)
    keyword = spellCheck.keyword_analysis(text)
    result = " ".join(keyword)

    return str(result)



