# 🚀 Complete Deployment & Update Guide

## 📋 **Your Website Will Be Live At:**
**URL:** `https://neelima-girls-hostel.herokuapp.com`

---

## 🛠️ **DEPLOYMENT PROCESS (Step-by-Step)**

### **Step 1: Install Git (Required)**
1. **Download Git:** [git-scm.com/download/win](https://git-scm.com/download/win)
2. **Install Git:** Run the downloaded installer
3. **Restart your computer** after installation

### **Step 2: Create Heroku Account**
1. **Go to:** [heroku.com](https://heroku.com)
2. **Click:** "Sign up for free"
3. **Use email:** `Naidu7700@gmail.com`
4. **Verify your email**

### **Step 3: Install Heroku CLI**
1. **Download:** [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. **Install:** Run the downloaded installer
3. **Restart your computer**

### **Step 4: Deploy Your Website**
Open Command Prompt/PowerShell in your project folder and run:

```bash
# Login to Heroku
heroku login

# Create your app
heroku create neelima-girls-hostel

# Initialize Git
git init
git add .
git commit -m "Initial deployment of Neelima Girls Hostel website"

# Deploy to Heroku
git push heroku main
```

### **Step 5: Your Website is Live!**
- **URL:** `https://neelima-girls-hostel.herokuapp.com`
- **Admin Password:** `neelima2024`
- **Share this link** with anyone worldwide!

---

## 🔄 **HOW TO UPDATE YOUR WEBSITE**

### **Method 1: Update Content (Easy)**

#### **A. Update Text Information:**
1. **Edit files** in your project folder:
   - `templates/index.html` - Change text, address, phone, email
   - `static/css/style.css` - Change colors, fonts, layout
   - `static/js/script.js` - Change admin password, functionality

2. **Deploy changes:**
   ```bash
   git add .
   git commit -m "Updated hostel information"
   git push heroku main
   ```

#### **B. Update Admin Password:**
1. **Open:** `static/js/script.js`
2. **Find line 74:** `const adminPassword = 'neelima2024';`
3. **Change to:** `const adminPassword = 'your-new-password';`
4. **Deploy:**
   ```bash
   git add .
   git commit -m "Updated admin password"
   git push heroku main
   ```

#### **C. Update Contact Information:**
1. **Open:** `templates/index.html`
2. **Find contact sections** (lines 217-233 and 298-300)
3. **Update:** Address, phone, email
4. **Deploy:**
   ```bash
   git add .
   git commit -m "Updated contact information"
   git push heroku main
   ```

### **Method 2: Add Photos/Videos (Admin Panel)**

1. **Visit your website:** `https://neelima-girls-hostel.herokuapp.com`
2. **Scroll to Gallery section**
3. **Click "Admin Access"**
4. **Enter password:** `neelima2024`
5. **Upload photos/videos**
6. **Changes appear immediately!**

### **Method 3: Update Facilities**

1. **Open:** `templates/index.html`
2. **Find facilities section** (lines 104-133)
3. **Edit facility cards:**
   ```html
   <div class="facility-card">
       <i class="fas fa-bed"></i>  <!-- Change icon -->
       <h3>Your Facility Name</h3>  <!-- Change title -->
       <p>Your facility description</p>  <!-- Change description -->
   </div>
   ```
4. **Deploy:**
   ```bash
   git add .
   git commit -m "Updated facilities"
   git push heroku main
   ```

---

## 🎨 **COMMON UPDATES**

### **Change Colors:**
- **File:** `static/css/style.css`
- **Find:** `#6c5ce7` (main purple color)
- **Replace:** With your preferred color (e.g., `#ff6b6b` for red)

### **Change Fonts:**
- **File:** `templates/index.html`
- **Find:** `font-family: 'Poppins'`
- **Replace:** With your preferred font

### **Add New Sections:**
- **File:** `templates/index.html`
- **Add:** New HTML sections between existing ones
- **Style:** Add CSS in `static/css/style.css`

### **Update Map Location:**
- **File:** `static/js/script.js`
- **Find lines 361-362:** Update coordinates
- **Deploy:** Changes take effect immediately

---

## 📱 **QUICK UPDATE COMMANDS**

### **For Any Changes:**
```bash
# Navigate to your project folder
cd D:\Dashboard\Cursor_practice

# Add all changes
git add .

# Commit with description
git commit -m "Description of your changes"

# Deploy to live website
git push heroku main
```

### **Check Deployment Status:**
```bash
# View deployment logs
heroku logs --tail

# Check app status
heroku ps
```

---

## 🔧 **TROUBLESHOOTING**

### **If Deployment Fails:**
1. **Check Git status:** `git status`
2. **Check Heroku logs:** `heroku logs --tail`
3. **Restart app:** `heroku restart`

### **If Website is Slow:**
1. **Restart Heroku app:** `heroku restart`
2. **Check logs:** `heroku logs --tail`

### **If Changes Don't Appear:**
1. **Clear browser cache** (Ctrl+F5)
2. **Wait 2-3 minutes** for deployment
3. **Check Heroku logs** for errors

---

## 📞 **SUPPORT & HELP**

### **Your Website Details:**
- **URL:** `https://neelima-girls-hostel.herokuapp.com`
- **Admin Password:** `neelima2024`
- **Contact:** Naidu7700@gmail.com
- **Phone:** +91 9866978943

### **Quick Reference:**
- **Update text:** Edit `templates/index.html`
- **Update style:** Edit `static/css/style.css`
- **Update functionality:** Edit `static/js/script.js`
- **Deploy changes:** `git add . && git commit -m "Update" && git push heroku main`

---

## 🎯 **NEXT STEPS**

1. **Deploy your website** using the steps above
2. **Test all features** on the live site
3. **Share the URL** with potential residents
4. **Update content** as needed using the methods above

**Your professional hostel website will be live and accessible worldwide!**
