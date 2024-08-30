from flask import Flask, render_template, request, jsonify, redirect, url_for
import openai
import json
import os
from datetime import datetime

app = Flask(__name__)

def load_api_key():
    with open('openai_api_key.txt', 'r') as file:
        return file.read().strip()
openai.api_key = load_api_key()

# chatGPT
def generate(themebox):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "あなたは役に立つアシスタントです。"},
            {"role": "user", "content": f"1. 1行目に、{themebox}に関連する単語を生成してください。()書きはしないでください。"},
            {"role": "user", "content": f"2. 2行目に、単語の英語と数字をそのままに、カタカナと漢字をひらがなに変換した単語も生成してください。"},
            {"role": "user", "content": f"3. 3行目に、生成した単語に説明だけを付けてください。"},
            {"role": "user", "content": f"4. 全ての行の先頭に必ず”-”を付けてください"},
            {"role": "user", "content": f"1. 2. 3. 4.を順に、20回繰り返してください"},
            {"role": "user", "content": f"これ以外は生成する必要はありません。"}
        ],
        max_tokens = 2000,
    )
    themebox_response = response.choices[0].message['content']
    entries = themebox_response.split("\n\n")
    data = []
    for idx, entry in enumerate(entries):
        if entry.strip():  # 空行を無視
            parts = entry.split("\n")
            if len(parts) >= 3:
                tango = parts[0].split("- ")[1].strip()
                yomi = parts[1].strip().split("- ")[1].strip()
                explain = parts[2].strip().split("- ")[1].strip()
                data.append({
                    "id": idx + 1,
                    "tango": tango,
                    "yomi": yomi,
                    "explain": explain
                })
    return data

@app.route('/', methods=['GET', 'POST'])
def index():
	return render_template('title.html')

@app.route('/change', methods=['GET', 'POST'])
def change():
    action = request.form.get('action')
    if action == 'play':
        return redirect(url_for('play1'))
    elif action == 'play2':
        return redirect(url_for('play2'))
    elif action == 'play3':
        return redirect(url_for('play3'))
    elif action == 'index':
        return redirect(url_for('index'))
    elif action == 'replay':
        return redirect(url_for('replay'))
    elif action == 'ranking':
        return redirect(url_for('ranking'))
    else:
        return render_template('title.html')
    

@app.route('/play1', methods=['GET', 'POST'])
def play1():
    return render_template('play1.html')

@app.route('/play2', methods=['GET', 'POST'])
def play2():
    if request.method == 'POST':
        themebox = request.form['themebox']
        data = generate(themebox)
        print("生成できたよ")
        return render_template('play2.html', data=data, themebox=themebox)
    # 'GET' メソッドの場合、空のデータを渡す
    return render_template('play2.html', data=[], themebox=themebox)

@app.route('/play3', methods=['GET', 'POST'])
def play3():
    if request.method == 'POST':
        themebox = request.form['themebox']
        data = generate(themebox)
        return render_template('play3.html', data=data, themebox=themebox)
    # 'GET' メソッドの場合、空のデータを渡す
    return render_template('play3.html', data=[], themebox=themebox)

@app.route('/title', methods=['GET', 'POST'])
def title():
	return render_template('title.html')

@app.route('/replay1')
def replay1():
    # JSONファイルを保存しているディレクトリ
    json_dir = 'save_json'
    json_files = []
    
    for filename in os.listdir(json_dir):
        if filename.endswith('.json'):
            filepath = os.path.join(json_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            json_files.append({
                'filename': filename,
                'data': data
            })
    
    return render_template('replay1.html', json_files=json_files)

@app.route('/replay2', methods=['POST'])
def replay2():
    # POSTリクエストからファイル名を取得
    json_data = request.get_json()
    filename = json_data.get('filename')
    
    # JSONファイルを保存しているディレクトリ
    json_dir = 'save_json'
    filepath = os.path.join(json_dir, filename)
    
    # ファイルが存在するか確認
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return render_template('replay2.html', data=data)
    else:
        return jsonify({"error": "ファイルが見つかりませんでした。"}), 404


@app.route('/replay3', methods=['POST'])
def replay3():
    # POSTリクエストからファイル名を取得
    json_data = request.get_json()
    filename = json_data.get('filename')
    
    # JSONファイルを保存しているディレクトリ
    json_dir = 'save_json'
    filepath = os.path.join(json_dir, filename)
    
    # ファイルが存在するか確認
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return render_template('replay3.html', data=data)
    else:
        return jsonify({"error": "ファイルが見つかりませんでした。"}), 404

@app.route('/result', methods=['GET', 'POST'])
def result():
    return render_template()

@app.route('/ranking', methods=['GET', 'POST'])
def ranking():
    return render_template('ranking.html')

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
