set -o errexit

pip install -r requirements.txt

python manage.py collectstatics --no-input

python manage.py migrate