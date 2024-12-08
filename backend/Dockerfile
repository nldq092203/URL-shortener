# Use Python 3.10 slim image
FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "url_shortener.wsgi:application", "--bind", "0.0.0.0:8000"]