from flask import Flask, render_template, request, url_for

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/game")
def game():
    return render_template('game.html')


@app.route("/hello")
def hello():
    return "Hello World from Flask"


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)
