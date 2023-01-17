from flask import render_template
from Project import app


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/sobre')
def sobre():
    return render_template("sobre.html")


@app.route('/venda')
def venda():
    return render_template("venda.html")


@app.route('/carro')
def carro():
    return render_template("carro.html")
