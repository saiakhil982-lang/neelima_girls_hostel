"""Production deployment script for Neelima Girls Hostel website."""

from app import app
import os

if __name__ == '__main__':
    # Production settings
    app.config['DEBUG'] = False
    app.config['SECRET_KEY'] = 'your-production-secret-key-change-this'
    
    # Get port from environment variable or use 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run the application
    app.run(host='0.0.0.0', port=port)
