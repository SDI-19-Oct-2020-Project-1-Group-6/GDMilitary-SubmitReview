FROM postgres:alpine

ENV POSTGRES_PASSWORD pikachu

ENV POSTGRES_DB reviews

COPY init.sql /docker-entrypoint-initdb.d/