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
from pyspark.sql.functions import col
# spark = SparkSession.builder.config("spark.jars", "./mysql-connector-java-8.0.30/mysql-connector-java-8.0.30.jar") \
#     .master("local").appName("PySpark_MySQL_test").getOrCreate()

spark = SparkSession.builder.master("local[*]") \
    .appName("PySpark_MySQL_test").config("spark.driver", "4g").getOrCreate()

spark.conf.set("spark.sql.shuffle.partitions", 300)

animal_df = spark.read.format("jdbc").option("url", "jdbc:mysql://j7b102.p.ssafy.io/lo-fi?serverTimezone=Asia/Seoul") \
    .option("driver", "com.mysql.jdbc.Driver").option("dbtable", "missing_animal") \
    .option("user", "b102").option("password", "ssafy").load()


#df = animal_df.toPandas()
today = datetime.today().strftime("%Y-%m-%d")

# pandasDF[pandasDF['update_day'] == pd.to_datetime(today)]['update_day']
start = time.time()

animal_df.show()
#print(type(animal_df))
keyword_df = pd.DataFrame(columns=('keyword', 'animal_id', 'found_id', 'lost_id', 'person_id'))
  
keyword_schema = StructType([
  StructField("keyword", StringType(), True),
  StructField("animal_id", LongType(), True),
  StructField("found_id", LongType(), True),
  StructField("lost_id", LongType(), True),
  StructField("person_id", LongType(), True)
])

print('=' * 30)
count_df = animal_df.groupby("update_day").count()
count_df.show()
cnt = 0
for row in count_df.collect():
  if(str(row[0])==today):
    print(row[1])
    cnt = row[1]
    break

print('=' * 30)

#keyword_df = pd.DataFrame(columns=("keyword", "animal_id", "found_id", "lost_id", "person_id"))
keyword_df = spark.createDataFrame([], keyword_schema)


end = time.time()

sec = (end - start)
result = timedelta(seconds=sec)
print(result)


prop = {
  'user' : 'b102',
  'password': 'ssafy',
  'driver': 'com.mysql.cj.jdbc.Driver'
} 
#animal_df.write.option("truncate","true").jdbc(url='jdbc:mysql://j7b102.p.ssafy.io/lo-fi?serverTimezone=Asia/Seoul', table='missing_animal',
#                    mode='overwrite', properties=prop) 
keyword_df.write.jdbc(url='jdbc:mysql://j7b102.p.ssafy.io/lo-fi?serverTimezone=Asia/Seoul', table='keyword',
                    mode='append', properties=prop) 