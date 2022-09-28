from typing import Optional

from fastapi import FastAPI
import spellCheck
app = FastAPI()

@app.get("/api/spellCheck/{spell}")
def spell_check(spell: Optional[str] =None):
    text = spellCheck.spellCehck_Busan((spell))

    return {'spellCheck': text}

@app.get("/api/keyword/{keyword}")
def read_keyword(keyword: Optional[str] = None):
    text = spellCheck.spellCehck_Busan(keyword)
    keyword = spellCheck.keyword_analysis(text)
    result = " ".join(keyword)

    return {'keyword': result}

@app.get("/api/map/{keyword}")
def read_map(keyword: Optional[str] = None):
    text = spellCheck.spellCehck_Busan(keyword)
    keyword = spellCheck.map_keyword_analysis(text);
    result = " ".join(keyword)

    return {'mapKeyword' : result}