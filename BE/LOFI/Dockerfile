FROM openjdk:8-jdk-alpine AS build
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x gradlew
RUN ["./gradlew", "bootJar"]

FROM openjdk:8-jdk-alpine
# // FROM amazoncorretto:11 ==> amazon corretto 11 사용할 경우
# ARG JAR_FILE=build/libs/*.jar
COPY --from=build build/libs/*.jar app.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","/app.jar"]
# // ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod","/app.jar"]
# // => 설정파일을 분리해서 사용할 때
# // java -jar -Dspring.profiles.active=prod app.jar