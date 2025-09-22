# Neelima Girls Hostel Website

A modern, responsive website for Neelima Girls Hostel featuring photo/video gallery, admin panel, and contact information.

## Features

- 🏠 **Responsive Design** - Works on desktop, tablet, and mobile
- 📸 **Photo & Video Gallery** - Admin-controlled media uploads
- 🔒 **Admin Panel** - Password-protected upload system
- 📱 **Contact Information** - Address, phone, and email
- 🎨 **Modern UI** - Beautiful animations and interactions

## Local Development

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Application:**
   ```bash
   python app.py
   ```

3. **Access the Website:**
   - Open your browser and go to `http://localhost:5000`

## Admin Access

- **Password:** `neelima2024`
- **Access:** Click "Admin Access" button in the Gallery section
- **Features:** Upload photos/videos, manage media

## Deployment Options

### Option 1: Heroku (Recommended)

1. **Create Heroku Account:**
   - Go to [heroku.com](https://heroku.com)
   - Sign up for a free account

2. **Install Heroku CLI:**
   - Download from [devcenter.heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

3. **Deploy:**
   ```bash
   # Login to Heroku
   heroku login
   
   # Create new app
   heroku create neelima-girls-hostel
   
   # Deploy
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

4. **Your website will be live at:**
   - `https://neelima-girls-hostel.herokuapp.com`

### Option 2: PythonAnywhere

1. **Create Account:**
   - Go to [pythonanywhere.com](https://pythonanywhere.com)
   - Sign up for a free account

2. **Upload Files:**
   - Upload all project files to your account

3. **Configure Web App:**
   - Create new web app
   - Set source code to your project folder
   - Set WSGI file to `app.py`

### Option 3: Vercel

1. **Create Account:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Connect Repository:**
   - Push code to GitHub
   - Connect repository to Vercel

3. **Deploy:**
   - Vercel will automatically deploy your site

## Custom Domain Setup

### For Heroku:

1. **Add Custom Domain:**
   ```bash
   heroku domains:add www.neelimahostel.com
   heroku domains:add neelimahostel.com
   ```

2. **Configure DNS:**
   - Point your domain to Heroku's servers
   - Add CNAME record: `www.neelimahostel.com` → `neelima-girls-hostel.herokuapp.com`
   - Add A record: `neelimahostel.com` → Heroku IP

### For Other Platforms:

1. **Get your deployment URL** (e.g., `https://your-app.herokuapp.com`)
2. **Configure DNS** to point your domain to the deployment URL
3. **Update CORS settings** if needed

## Configuration

### Environment Variables:
- `SECRET_KEY` - Flask secret key for sessions
- `PORT` - Port number (default: 5000)

### Admin Password:
- Change the admin password in `static/js/script.js`
- Look for: `const adminPassword = 'neelima2024';`

## File Structure

```
├── app.py                 # Main Flask application
├── deploy.py             # Production deployment script
├── requirements.txt      # Python dependencies
├── Procfile             # Heroku deployment file
├── templates/
│   └── index.html       # Main HTML template
└── static/
    ├── css/
    │   └── style.css    # Styling and animations
    ├── js/
    │   └── script.js    # JavaScript functionality
    └── uploads/         # Uploaded media files
        ├── photos/
        └── videos/
```

## Support

For technical support or questions about the website, contact:
- **Email:** Naidu7700@gmail.com
- **Phone:** +91 9866978943

## License

This project is created for Neelima Girls Hostel. All rights reserved.
