# Etapa 1: Compilar
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copiamos todo el contenido de la carpeta server
COPY . .
# Compilamos usando Maven (Render instalará Maven por nosotros)
RUN mvn clean package -DskipTests

# Etapa 2: Ejecutar
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copiamos el archivo .jar generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]