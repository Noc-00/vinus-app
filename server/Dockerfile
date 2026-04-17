# 1. Etapa de compilación
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copiamos solo el pom.xml primero (optimización de caché)
COPY pom.xml .
# Descargamos dependencias antes de copiar el código
RUN mvn dependency:go-offline
# Copiamos el resto del código
COPY src ./src
# Compilamos
R# Cambia tu línea 11 (RUN mvn...) por esta:
 RUN mvn clean package -DskipTests -e -X

# 2. Etapa de ejecución
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copiamos el JAR resultante
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]