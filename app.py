"""Flask web application for Neelima Girls Hostel.

Features:
- Photo and video uploads
- Dynamic content management
- Responsive design
- File storage and serving
"""

import os
import uuid
from flask import Flask, render_template, request, jsonify, send_from_directory, redirect, url_for
from werkzeug.utils import secure_filename
from datetime import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max file size

# Ensure upload directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'photos'), exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'videos'), exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'logos'), exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {
    'photos': {'png', 'jpg', 'jpeg', 'gif', 'webp'},
    'videos': {'mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv'},
    'logos': {'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'}
}

def allowed_file(filename, file_type):
    """Check if file extension is allowed."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS[file_type]

def save_file_info(filename, file_type, original_name):
    """Save file metadata to JSON file."""
    file_info = {
        'id': str(uuid.uuid4()),
        'filename': filename,
        'original_name': original_name,
        'file_type': file_type,
        'upload_date': datetime.now().isoformat(),
        'size': os.path.getsize(os.path.join(app.config['UPLOAD_FOLDER'], file_type, filename))
    }
    
    data_file = os.path.join(app.config['UPLOAD_FOLDER'], 'file_data.json')
    if os.path.exists(data_file):
        with open(data_file, 'r') as f:
            data = json.load(f)
    else:
        data = []
    
    data.append(file_info)
    
    with open(data_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    return file_info

@app.route('/')
def index():
    """Main page with hostel information and media gallery."""
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads (photos and videos)."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file selected'}), 400
    
    file = request.files['file']
    file_type = request.form.get('type', 'photos')
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename, file_type):
        # Generate unique filename
        file_extension = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        
        # Save file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_type, unique_filename)
        file.save(file_path)
        
        # Save metadata
        file_info = save_file_info(unique_filename, file_type, file.filename)
        
        return jsonify({
            'success': True,
            'file_info': file_info,
            'url': url_for('uploaded_file', file_type=file_type, filename=unique_filename)
        })
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/uploads/<file_type>/<filename>')
def uploaded_file(file_type, filename):
    """Serve uploaded files."""
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], file_type), filename)

@app.route('/api/media')
def get_media():
    """Get all uploaded media files."""
    data_file = os.path.join(app.config['UPLOAD_FOLDER'], 'file_data.json')
    if os.path.exists(data_file):
        with open(data_file, 'r') as f:
            data = json.load(f)
    else:
        data = []
    
    return jsonify(data)

@app.route('/api/media/<media_id>', methods=['DELETE'])
def delete_media(media_id):
    """Delete a media file."""
    data_file = os.path.join(app.config['UPLOAD_FOLDER'], 'file_data.json')
    if not os.path.exists(data_file):
        return jsonify({'error': 'No media found'}), 404
    
    with open(data_file, 'r') as f:
        data = json.load(f)
    
    # Find and remove the file
    for i, item in enumerate(data):
        if item['id'] == media_id:
            # Delete physical file
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], item['file_type'], item['filename'])
            if os.path.exists(file_path):
                os.remove(file_path)
            
            # Remove from data
            del data[i]
            
            # Save updated data
            with open(data_file, 'w') as f:
                json.dump(data, f, indent=2)
            
            return jsonify({'success': True})
    
    return jsonify({'error': 'Media not found'}), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
