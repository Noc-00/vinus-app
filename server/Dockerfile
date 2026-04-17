# 1. Etapa de compilación
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
# Ejecutamos con -e y -X para ver el error real
RUN mvn clean package -DskipTests -e -X

# 2. Etapa de ejecución
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]