/**
 * Utilities for the News Authenticity Checker frontend
 */

// API Configuration
const API_CONFIG = {
    baseUrl: process.env.API_URL || 'http://localhost:8000',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
};

// Error messages
const ERROR_MESSAGES = {
    networkError: 'Network error. Please check your connection and try again.',
    serverError: 'Server error. Please try again later.',
    rateLimitError: 'Too many requests. Please wait a moment and try again.',
    validationError: 'Please check your input and try again.',
    authError: 'Authentication error. Please log in again.',
    timeoutError: 'Request timed out. Please try again.'
};

// API client with error handling and retries
class ApiClient {
    constructor(config = API_CONFIG) {
        this.config = config;
        this.token = localStorage.getItem('auth_token');
    }

    async request(endpoint, options = {}) {
        let attempts = 0;
        
        while (attempts < this.config.retryAttempts) {
            try {
                const response = await this._makeRequest(endpoint, options);
                return await this._handleResponse(response);
            } catch (error) {
                attempts++;
                
                if (attempts === this.config.retryAttempts) {
                    throw this._handleError(error);
                }
                
                if (this._shouldRetry(error)) {
                    await this._delay(this.config.retryDelay * attempts);
                    continue;
                }
                
                throw this._handleError(error);
            }
        }
    }

    async _makeRequest(endpoint, options) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
                ...options,
                headers,
                signal: controller.signal
            });
            return response;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async _handleResponse(response) {
        const contentType = response.headers.get('content-type');
        const data = contentType?.includes('application/json') 
            ? await response.json() 
            : await response.text();

        if (!response.ok) {
            throw {
                status: response.status,
                data
            };
        }

        return data;
    }

    _handleError(error) {
        if (error.name === 'AbortError') {
            return new Error(ERROR_MESSAGES.timeoutError);
        }

        switch (error.status) {
            case 400:
                return new Error(ERROR_MESSAGES.validationError);
            case 401:
                this._handleAuthError();
                return new Error(ERROR_MESSAGES.authError);
            case 429:
                return new Error(ERROR_MESSAGES.rateLimitError);
            case 500:
                return new Error(ERROR_MESSAGES.serverError);
            default:
                return new Error(ERROR_MESSAGES.networkError);
        }
    }

    _shouldRetry(error) {
        return error.status === 429 || error.status >= 500;
    }

    _handleAuthError() {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    }

    async _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Input validation
const validateInput = (input) => {
    if (typeof input !== 'string') {
        return false;
    }

    const trimmed = input.trim();
    if (trimmed.length < 10 || trimmed.length > 5000) {
        return false;
    }

    if (trimmed.startsWith('http')) {
        try {
            new URL(trimmed);
            return true;
        } catch {
            return false;
        }
    }

    const words = trimmed.split(/\s+/);
    return words.length >= 5;
};

// Accessibility helpers
const accessibility = {
    setFocus: (element) => {
        if (element) {
            element.focus();
        }
    },

    trapFocus: (element) => {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    },

    announceMessage: (message) => {
        const announcer = document.getElementById('accessibility-announcer');
        if (!announcer) {
            const div = document.createElement('div');
            div.id = 'accessibility-announcer';
            div.setAttribute('aria-live', 'polite');
            div.setAttribute('aria-atomic', 'true');
            div.className = 'sr-only';
            document.body.appendChild(div);
        }
        announcer.textContent = message;
    }
};

// Error handling
const handleError = (error, element) => {
    const errorMessage = error.message || ERROR_MESSAGES.networkError;
    
    // Show visual error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = errorMessage;
    
    if (element) {
        element.appendChild(errorDiv);
        element.setAttribute('aria-invalid', 'true');
        element.setAttribute('aria-describedby', errorDiv.id);
    }
    
    // Announce error for screen readers
    accessibility.announceMessage(errorMessage);
    
    // Log error
    console.error('Error:', error);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
        if (element) {
            element.removeAttribute('aria-invalid');
            element.removeAttribute('aria-describedby');
        }
    }, 5000);
};

// Loading state management
const loadingState = {
    show: (button, loadingText = 'Loading...') => {
        const originalText = button.textContent;
        button.disabled = true;
        button.setAttribute('data-original-text', originalText);
        button.innerHTML = `
            <span class="loading-spinner"></span>
            <span class="loading-text">${loadingText}</span>
        `;
        button.setAttribute('aria-busy', 'true');
    },
    
    hide: (button) => {
        const originalText = button.getAttribute('data-original-text');
        button.disabled = false;
        button.textContent = originalText;
        button.removeAttribute('data-original-text');
        button.removeAttribute('aria-busy');
    }
};

// Export utilities
window.newsChecker = {
    api: new ApiClient(),
    validateInput,
    accessibility,
    handleError,
    loadingState
};