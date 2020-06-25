# mincamp
## 目次
- 開発方針
- Herokuデプロイ

# 開発方針
サーバ起動
```bash
$ python manage.py runserver 
```
 
# Herokuデプロイ
1. 「.gitignore」を作成する。

```.gitignore
user　👈これは自分の開発環境の名前(terminalの$マークの後ろの文字)
__pycache__
staticfiles
db.sqlite3
*.py[co]
```

2. 「Procfile」を作成する。

```Procfile
web: gunicorn mincamp.wsgi --log-file -
```

3. 次のコマンドを実行し、「requirements.txt」を作成する。

```bash
pip freeze > requirements.txt
```
以下のようになっていなければ修正。

```requirements.txt
asgiref==3.2.7
dj-database-url==0.5.0
Django==2.0
django-basicauth==0.5.2
django-sass-processor==0.8
gunicorn==20.0.4
libsass==0.20.0
mysqlclient==1.4.6
PyMySQL==0.9.3
pytz==2020.1
six==1.15.0
sqlparse==0.3.1
whitenoise==3.3.1
```

 
4. 「runtime.txt」を作成する。

```runtime.txt
python-3.7.3
```

5. 「settings.py」を編集する。

```settings.py
...
ALLOWED_HOSTS = ['*']
...
MIDDLEWARE = [
    'basicauth.middleware.BasicAuthMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
...
WSGI_APPLICATION = 'mincamp.wsgi.application'
import dj_database_url
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
db_from_env = dj_database_url.config()
DATABASES = {
    'default': dj_database_url.config()
}
...
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '[DB名]]',
        'USER': '[ユーザ名]',
        'PASSWORD': '[パスワード]]',
        'HOST': '[ホスト名]',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}
...
```

6. Herokuコマンドを実行。

```bash
$ heroku login
$ heroku create mincamp
$ heroku addons:create cleardb:ignite --app mincamp
$ heroku config
CLEARDB_DATABASE_URL: mysql://[ユーザ名]:[パスワード]@[ホスト名]/[DB名]?reconnect=true
$ git add -A . 
$ git commit -m "Herokuデプロイ"
$ heroku config:set DISABLE_COLLECTSTATIC=1
$ git push heroku master    ※特定ブランチのデプロイ👉「$ git push heroku [ブランチ名]:master --force」
$ heroku ps:scale web=1
$ heroku run python manage.py migrate
```