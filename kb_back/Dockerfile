FROM python:3.7.9-buster

WORKDIR back
ADD requirenments.txt .
RUN pip install -r requirenments.txt

ENV DOCKER_LAUNCH "true"

ADD . .

EXPOSE 8000
CMD python manage.py migrate && uwsgi --ini ./uwsgi.config