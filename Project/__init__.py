from flask import Flask

app = Flask(__name__)

app.config["SECRET_KEY"] = '6d5496ed6dc56439d626c031318ad3a1'

from Project import routes
