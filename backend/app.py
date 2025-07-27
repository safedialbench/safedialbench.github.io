# app.py
from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import pandas as pd
import os

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.qq.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route('/upload-excel', methods=['POST'])
def upload_excel():
    file = request.files.get('excel')
    if not file:
        return jsonify({'success': False, 'error': '未收到文件'})
    filepath = os.path.join('/tmp', file.filename)
    file.save(filepath)
    msg = Message('新Excel上传', sender=app.config['MAIL_USERNAME'], recipients=['970946263@qq.com'])
    msg.body = '有用户上传了新的Excel文件，见附件。'
    with open(filepath, 'rb') as f:
        msg.attach(file.filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', f.read())
    mail.send(msg)
    df = pd.read_excel(filepath)
    uploaded_data = df.to_dict(orient='index')
    return jsonify({'success': True, 'uploadedData': uploaded_data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)