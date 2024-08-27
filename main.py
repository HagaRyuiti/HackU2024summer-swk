from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

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
            "tango": "チョコレート",
            "yomi": "ちょこれーと",
            "explain": "カカオ豆をいって粉にした洋菓子の一種。"
        },
        {
            "id": 4,
            "tango": "チョコレート",
            "yomi": "ちょこれーと",
            "explain": "カカオ豆をいって粉にした洋菓子の一種。"
        }
    ]
    return render_template('play.html', data=data)

@app.route('/save_data', methods=['POST'])
def save_data():
    # リクエストからデータを取得
    data = request.json
    
    # 現在の日時を取得してフォーマット
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # 保存するディレクトリを指定
    directory = 'save_json'
    
    # ディレクトリが存在しない場合は作成
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    # ファイル名に日時を使用
    file_name = f'{directory}/output_data_{timestamp}.json'
    
    # JSONファイルにデータを保存
    with open(file_name, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    
    return jsonify({"message": "データが保存されました", "file_name": file_name})

if __name__ == '__main__':
    app.run(debug=True)
