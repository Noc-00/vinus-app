# 1. Etapa de compilación (usamos una imagen oficial de Maven con Java 21)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# Compilamos el proyecto, saltando los tests para ir rápido
RUN mvn clean package -DskipTests

# 2. Etapa de ejecución (usamos una imagen ligera de Java 21)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copiamos el archivo .jar que se creó en la etapa anterior
COPY --from=build /app/target/*.jar app.jar
# Abrimos el puerto 8080 que es el estándar de Spring Boot
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]