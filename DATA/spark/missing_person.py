# -*- coding: utf-8 -*-
import pyspark
from pyspark.sql import SparkSession
import pandas as pd
import spellCheck
import time
from datetime import timedelta
from datetime import datetime
from pyspark.sql.types import StructType, StructField, StringType, LongType, BooleanType, DoubleType, DateType, TimestampType
from pyspark.sql.functions import when
import pymysql

# spark = SparkSession.builder.config("spark.jars", "./mysql-connector-java-8.0.30/mysql-connector-java-8.0.30.jar") \
#     .master("local").appName("PySpark_MySQL_test").getOrCreate()

spark = SparkSession.builder.master("local[*]") \
    .appName("PySpark_MySQL_test").config("spark.driver", "4g").getOrCreate()

spark.conf.set("spark.sql.shuffle.partitions", 300)

person_df = spark.read.format("jdbc").option("url", "jdbc:mysql://j7b102.p.ssafy.io/lo-fi?serverTimezone=Asia/Seoul") \
    .option("driver", "com.mysql.jdbc.Driver").option("dbtable", "missing_person") \
    .option("user", "b102").option("password", "ssafy").load()


#df = animal_df.toPandas()
today = datetime.today().strftime("%Y-%m-%d")

# pandasDF[pandasDF['update_day'] == pd.to_datetime(today)]['update_day']
start = time.time()

person_df.show()
#print(type(animal_df))
keyword_df = pd.DataFrame(columns=('keyword', 'animal_id', 'found_id', 'lost_id', 'person_id'))

        
keyword_schema = StructType([
  StructField("keyword", StringType(), True),
  StructField("animal_id", LongType(), True),
  StructField("found_id", LongType(), True),
  StructField("lost_id", LongType(), True),
  StructField("person_id", LongType(), True)
])

#keyword_df = pd.DataFrame(columns=("keyword", "animal_id", "found_id", "lost_id", "person_id"))
keyword_df = spark.createDataFrame([], keyword_schema)
keyword_df.show()


for row in person_df.rdd.collect():
  keyword = []
  print(row.id)
  
  all = row.description + "/?/" + row.location + "/?/" + row.dress + "/?/" + row.category
  all_spell = spellCheck.spellCehck_Busan(all).split('/?/')
  
  description = all_spell[0]
  
  location = all_spell[1]
  
  pos = spellCheck.coordinate_change_dt(location)
  latitude = pos['y']
  lognitude = pos['x']
  
  dress = all_spell[2]
  
  category = all_spell[3]
  
  conn = pymysql.connect(host='j7b102.p.ssafy.io', user='b102', password='ssafy', db='lo-fi', charset='utf8')
  cur = conn.cursor()
  sql = 'update missing_person set description = %s, location = %s, latitude = %s, longitude = %s, dress = %s, category = %s where id = %s'
  cur.execute(sql, (description , location, latitude, longitude, dress, category, row.id) )
  conn.commit()
  conn.close()
  
  keyword.extend(spellCheck.keyword_analysis(description))
  keyword.extend(spellCheck.keyword_analysis(location))
  keyword.extend(spellCheck.keyword_analysis(dress))
  keyword.extend(spellCheck.keyword_analysis(category))
  
  for value in keyword:
    #value_df = pd.DataFrame({'keyword': [value], 'animal_id':[row.id]})
    #keyword_df = keyword_df.append(value_df, ignore_index=True)
    value_df = spark.createDataFrame([(str(value), None, None, None, row.id)], keyword_schema)
    keyword_df = keyword_df.union(value_df)
    
  
end = time.time()

sec = (end - start)
result = timedelta(seconds=sec)
print(result)


prop = {
  'user' : 'b102',
  'password': 'ssafy',
  'driver': 'com.mysql.cj.jdbc.Driver'
} 

#person_df.write.option("truncate","true").jdbc(url='jdbc:mysql://j7b102.p.ssafy.io/lo-fi?serverTimezone=Asia/Seoul', table='missing_person',
#                    mode='overwrite', properties=prop) 
keyword_df.write.jdbc(url='jdbc:mysql://j7b102.p.ssafy.io/lo-fi?serverTimezone=Asia/Seoul', table='keyword',
                    mode='append', properties=prop)                    
