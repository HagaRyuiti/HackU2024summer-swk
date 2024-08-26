from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    data = [
        {
            "id": 1,
            "tango": "機械学習",
            "yomi": "きかいがくしゅう",
            "explain": "データから学習し、予測や分類を行う技術。"
        },
        {
            "id": 2,
            "tango": "IoT",
            "yomi": "IoT",
            "explain": "モノがインターネットで接続・通信する技術。"
        },
        {
            "id": 3,
            "tango" : "チョコレート",
            "yomi" : "ちょこれーと",
            "explain" : "カカオ豆をいって粉にした洋菓子の一種。"
        },
        {
            "id": 4,
            "tango" : "チョコレート",
            "yomi" : "ちょこれーと",
            "explain" : "カカオ豆をいって粉にした洋菓子の一種。"
        }
    ]
    return render_template('play.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
