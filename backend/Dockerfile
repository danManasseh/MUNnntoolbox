FROM python:3.9-slim

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r endpoints/requirements.txt

EXPOSE 5000

ENV FLASK_APP=endpoints/app.py

ENV FLASK_ENV=production

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
