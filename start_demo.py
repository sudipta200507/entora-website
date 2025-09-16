#!/usr/bin/env python3
"""
Demo startup script for the News Authenticity Checker
This script starts both the backend API and opens the frontend in a browser
with proper error handling and logging.
"""
import subprocess
import webbrowser
import time
import os
import sys
import threading
import logging
import signal
import socket
import psutil
from pathlib import Path
from typing import Optional
from logging.handlers import RotatingFileHandler

# Configure logging
def setup_logging() -> None:
    """Set up logging configuration"""
    log_dir = Path(__file__).parent / "logs"
    log_dir.mkdir(exist_ok=True)
    
    log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    logging.basicConfig(
        level=logging.INFO,
        format=log_format,
        handlers=[
            RotatingFileHandler(
                log_dir / "demo.log",
                maxBytes=10000000,  # 10MB
                backupCount=5
            ),
            logging.StreamHandler(sys.stdout)
        ]
    )

# Port management
def is_port_in_use(port: int) -> bool:
    """Check if a port is in use"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def find_free_port(start_port: int = 8000) -> int:
    """Find a free port starting from start_port"""
    port = start_port
    while is_port_in_use(port):
        port += 1
    return port

# Process management
def kill_process_on_port(port: int) -> None:
    """Kill any process using the specified port"""
    for proc in psutil.process_iter(['pid', 'name', 'connections']):
        try:
            for conn in proc.connections():
                if conn.laddr.port == port:
                    proc.terminate()
                    proc.wait(timeout=5)
                    logging.info(f"Terminated process {proc.pid} using port {port}")
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.TimeoutExpired):
            pass

# Dependency management
def check_python_version() -> bool:
    """Check if Python version meets requirements"""
    required_version = (3, 8)
    current_version = sys.version_info[:2]
    return current_version >= required_version

def check_dependencies() -> bool:
    """Check if all required dependencies are installed"""
    required_packages = ['fastapi', 'uvicorn']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        logging.error(f"Missing dependencies: {', '.join(missing_packages)}")
        return False
    return True

def install_dependencies() -> bool:
    """Install required dependencies"""
    try:
        requirements_file = Path(__file__).parent / "backend" / "requirements.txt"
        subprocess.run(
            [sys.executable, "-m", "pip", "install", "-r", str(requirements_file)],
            check=True,
            capture_output=True,
            text=True
        )
        return True
    except subprocess.CalledProcessError as e:
        logging.error(f"Failed to install dependencies: {e.output}")
        return False

# Backend management
class BackendServer:
    """Manage the backend server process"""
    def __init__(self, port: int):
        self.port = port
        self.process: Optional[subprocess.Popen] = None
        self.logger = logging.getLogger("BackendServer")
    
    def start(self) -> bool:
        """Start the backend server"""
        backend_dir = Path(__file__).parent / "backend"
        if not backend_dir.exists():
            self.logger.error("Backend directory not found!")
            return False
        
        try:
            os.chdir(backend_dir)
            self.process = subprocess.Popen(
                [sys.executable, "start_server.py"],
                env={**os.environ, "PORT": str(self.port)}
            )
            self.logger.info(f"Backend server started on port {self.port}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to start backend: {e}")
            return False
    
    def stop(self) -> None:
        """Stop the backend server"""
        if self.process:
            self.process.terminate()
            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
            self.logger.info("Backend server stopped")

# Frontend management
class FrontendManager:
    """Manage the frontend interface"""
    def __init__(self, port: int):
        self.port = port
        self.logger = logging.getLogger("FrontendManager")
    
    def open(self) -> bool:
        """Open the frontend in the default browser"""
        frontend_path = Path(__file__).parent / "ai-projects.html"
        if not frontend_path.exists():
            self.logger.error("Frontend file not found!")
            return False
        
        try:
            webbrowser.open(f"file://{frontend_path.absolute()}")
            self.logger.info("Frontend opened in browser")
            return True
        except Exception as e:
            self.logger.error(f"Failed to open frontend: {e}")
            return False

# Main application
class DemoApplication:
    """Main demo application manager"""
    def __init__(self):
        self.logger = logging.getLogger("DemoApplication")
        self.port = find_free_port()
        self.backend = BackendServer(self.port)
        self.frontend = FrontendManager(self.port)
        self.running = False
    
    def start(self) -> None:
        """Start the demo application"""
        self.running = True
        
        # Set up signal handlers
        signal.signal(signal.SIGINT, self.handle_shutdown)
        signal.signal(signal.SIGTERM, self.handle_shutdown)
        
        # Kill any process using our port
        kill_process_on_port(self.port)
        
        # Start backend
        if not self.backend.start():
            return
        
        # Give backend time to start
        time.sleep(3)
        
        # Start frontend in a separate thread
        frontend_thread = threading.Thread(target=self.frontend.open)
        frontend_thread.daemon = True
        frontend_thread.start()
        
        # Keep main thread alive
        try:
            while self.running:
                time.sleep(1)
        except KeyboardInterrupt:
            self.stop()
    
    def stop(self) -> None:
        """Stop the demo application"""
        self.running = False
        self.backend.stop()
        self.logger.info("Demo application stopped")
    
    def handle_shutdown(self, signum, frame) -> None:
        """Handle shutdown signals"""
        self.logger.info(f"Received signal {signum}")
        self.stop()

def main() -> None:
    """Main entry point"""
    # Set up logging
    setup_logging()
    logger = logging.getLogger("main")
    
    logger.info("Starting News Authenticity Checker Demo")
    
    # Check Python version
    if not check_python_version():
        logger.error("Python 3.8 or higher is required")
        sys.exit(1)
    
    # Check and install dependencies
    if not check_dependencies():
        logger.info("Installing missing dependencies...")
        if not install_dependencies():
            logger.error("Failed to install dependencies")
            sys.exit(1)
    
    # Create and start the application
    app = DemoApplication()
    try:
        app.start()
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        app.stop()
        sys.exit(1)

if __name__ == "__main__":
    main()
