FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD ./target/batch-visualizer-java-migrator-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java","-jar","/app.jar"]