FROM postgres:latest

ENV POSTGRES_PASSWORD password

ENV POSTGRES_DB reviews

COPY init.sql /docker-entrypoint-initdb.d/