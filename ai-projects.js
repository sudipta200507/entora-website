// AI Projects JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize API client
    const api = window.newsChecker.api;
    const { validateInput, accessibility, handleError, loadingState } = window.newsChecker;

    // Get DOM elements
    const newsInput = document.getElementById('newsInput');
    const verifyBtn = document.getElementById('verifyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultsSection = document.getElementById('resultsSection');
    const verdict = document.getElementById('verdict');
    const confidenceScore = document.getElementById('confidenceScore');
    const sourcesList = document.getElementById('sourcesList');
    const explanation = document.getElementById('explanation');

    // Add ARIA labels for accessibility
    newsInput.setAttribute('aria-label', 'Enter news text or URL for verification');
    verifyBtn.setAttribute('aria-label', 'Verify news content');
    clearBtn.setAttribute('aria-label', 'Clear input');
    
    // Set up focus management
    accessibility.trapFocus(document.querySelector('.tool-content'));

    // Dynamically set API endpoint based on current host
    function getApiEndpoint() {
        // If running on localhost or 127.0.0.1, use port 8000
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            return `http://${host}:8000/api/verify-news`;
        }
        // Otherwise, use same origin
        return `/api/verify-news`;
    }

    // Clear button functionality
    clearBtn.addEventListener('click', function() {
        newsInput.value = '';
        resultsSection.style.display = 'none';
        verifyBtn.disabled = false;
        verifyBtn.querySelector('.btn-text').style.display = 'inline';
        verifyBtn.querySelector('.btn-loading').style.display = 'none';
    });

    // Verify button functionality
    verifyBtn.addEventListener('click', async function() {
        const inputText = newsInput.value.trim();
        
        if (!inputText) {
            handleError(new Error('Please enter some text or a URL to verify.'), newsInput);
            return;
        }

        if (!validateInput(inputText)) {
            handleError(new Error('Please enter at least 5 words or a valid URL.'), newsInput);
            return;
        }

        try {
            // Show loading state
            loadingState.show(verifyBtn, 'Analyzing...');
            newsInput.disabled = true;

            // Make API call
            const endpoint = getApiEndpoint();
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input: inputText,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                let errorMsg = 'Network error. Please check your backend server.';
                if (response.status === 404) errorMsg = 'API endpoint not found.';
                if (response.status === 500) errorMsg = 'Server error. Please try again later.';
                if (response.status === 429) errorMsg = 'Rate limit exceeded. Please wait and try again.';
                throw new Error(errorMsg);
            }

            const result = await response.json();
            displayResults(result);
            accessibility.announceMessage(
                `Analysis complete. Verdict: ${result.verdict.text}. Confidence: ${result.confidence}%`
            );
        } catch (error) {
            handleError(error, newsInput);
            // Show alert for CORS/network errors
            if (error.message && error.message.includes('Network')) {
                alert('Unable to connect to backend. Please ensure the backend server is running at http://localhost:8000 and CORS is enabled.');
            }
        } finally {
            // Reset loading state
            loadingState.hide(verifyBtn);
            newsInput.disabled = false;
        }
    });

    // Input validation
    newsInput.addEventListener('input', function() {
        const hasContent = this.value.trim().length > 0;
        verifyBtn.disabled = !hasContent;
    });

    // News verification with backend API
    async function simulateNewsVerification(input) {
        try {
            // Try to connect to backend API first
            const result = await verifyNewsWithAPI(input);
            displayResults(result);
        } catch (error) {
            console.warn('Backend API not available, using mock data:', error);
            // Fallback to mock implementation
            try {
                const result = analyzeNewsContent(input);
                displayResults(result);
            } catch (mockError) {
                showMessage('error', 'An error occurred while analyzing the content. Please try again.');
                console.error('Verification error:', mockError);
            }
        } finally {
            // Reset button state
            verifyBtn.disabled = false;
            verifyBtn.querySelector('.btn-text').style.display = 'inline';
            verifyBtn.querySelector('.btn-loading').style.display = 'none';
        }
    }

    // Analyze news content (mock implementation)
    function analyzeNewsContent(input) {
        // Check if input is a URL
        const isUrl = /^https?:\/\/.+/.test(input);
        
        // Mock analysis based on content
        const mockResults = {
            verdict: getMockVerdict(input),
            confidence: getMockConfidence(input),
            sources: getMockSources(input),
            explanation: getMockExplanation(input, isUrl)
        };

        return mockResults;
    }

    // Mock verdict determination
    function getMockVerdict(input) {
        const lowerInput = input.toLowerCase();
        
        // Simple keyword-based mock analysis
        if (lowerInput.includes('breaking') || lowerInput.includes('urgent')) {
            return { type: 'unclear', text: 'Unclear' };
        } else if (lowerInput.includes('confirmed') || lowerInput.includes('verified')) {
            return { type: 'true', text: 'Likely True' };
        } else if (lowerInput.includes('fake') || lowerInput.includes('hoax')) {
            return { type: 'false', text: 'Likely False' };
        } else {
            return { type: 'unclear', text: 'Unclear' };
        }
    }

    // Mock confidence score
    function getMockConfidence(input) {
        const lowerInput = input.toLowerCase();
        let baseScore = 50;
        
        // Adjust based on content characteristics
        if (lowerInput.includes('source') || lowerInput.includes('according to')) {
            baseScore += 20;
        }
        if (lowerInput.includes('unconfirmed') || lowerInput.includes('rumor')) {
            baseScore -= 30;
        }
        if (lowerInput.includes('official') || lowerInput.includes('government')) {
            baseScore += 15;
        }
        
        return Math.max(10, Math.min(95, baseScore));
    }

    // Mock sources
    function getMockSources(input) {
        const mockSources = [
            {
                title: 'BBC News - Related Article',
                url: 'https://www.bbc.com/news/example',
                reliability: 'high'
            },
            {
                title: 'Reuters - Fact Check Report',
                url: 'https://www.reuters.com/factcheck/example',
                reliability: 'high'
            },
            {
                title: 'AP News - Verification',
                url: 'https://apnews.com/article/example',
                reliability: 'high'
            },
            {
                title: 'PolitiFact - Fact Check',
                url: 'https://www.politifact.com/factchecks/example',
                reliability: 'medium'
            }
        ];

        // Return 2-4 random sources
        const numSources = Math.floor(Math.random() * 3) + 2;
        return mockSources.slice(0, numSources);
    }

    // Mock explanation
    function getMockExplanation(input, isUrl) {
        const lowerInput = input.toLowerCase();
        
        if (isUrl) {
            return `This URL was analyzed by extracting the main claims from the article content. The analysis found ${getMockConfidence(input)}% confidence in the authenticity based on cross-referencing with trusted news sources.`;
        } else {
            return `The provided text was analyzed for key claims and factual statements. Our AI system cross-referenced these claims with reliable news sources and fact-checking databases to determine authenticity.`;
        }
    }

    // Display results with accessibility improvements
    function displayResults(result) {
        // Show results section
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Set ARIA attributes for results section
        resultsSection.setAttribute('role', 'region');
        resultsSection.setAttribute('aria-label', 'Verification Results');

        // Display verdict with proper ARIA attributes
        verdict.className = `result-verdict verdict-${result.verdict.type}`;
        verdict.textContent = result.verdict.text;
        verdict.setAttribute('role', 'status');
        verdict.setAttribute('aria-live', 'polite');

        // Display confidence score with accessibility improvements
        const confidenceLabel = `Confidence Score: ${result.confidence}%`;
        confidenceScore.innerHTML = `
            <h4 id="confidence-heading">Confidence Score</h4>
            <div class="confidence-value" role="meter" 
                 aria-valuenow="${result.confidence}" 
                 aria-valuemin="0" 
                 aria-valuemax="100"
                 aria-labelledby="confidence-heading">
                ${result.confidence}%
            </div>
            <div class="confidence-bar" role="presentation">
                <div class="confidence-fill" style="width: 0%"></div>
            </div>
        `;

        // Display sources with accessibility improvements
        sourcesList.innerHTML = '';
        sourcesList.setAttribute('role', 'list');
        sourcesList.setAttribute('aria-label', 'Supporting Sources');
        
        if (result.sources && Array.isArray(result.sources)) {
            result.sources.forEach((source, index) => {
                const sourceItem = document.createElement('div');
                sourceItem.className = 'source-item';
                sourceItem.setAttribute('role', 'listitem');
                
                const sourceLink = document.createElement('a');
                sourceLink.href = source.url;
                sourceLink.target = '_blank';
                sourceLink.rel = 'noopener noreferrer';
                sourceLink.textContent = source.title;
                sourceLink.setAttribute('aria-label', 
                    `${source.title} - ${source.reliability} reliability. Opens in new tab`);
                
                const icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt';
                icon.setAttribute('aria-hidden', 'true');
                
                const reliability = document.createElement('span');
                reliability.className = `source-reliability reliability-${source.reliability}`;
                reliability.textContent = source.reliability.toUpperCase();
                reliability.setAttribute('role', 'status');
                
                sourceItem.appendChild(icon);
                sourceItem.appendChild(sourceLink);
                sourceItem.appendChild(reliability);
                
                if (source.snippet) {
                    const snippet = document.createElement('p');
                    snippet.className = 'source-snippet';
                    snippet.textContent = source.snippet;
                    sourceItem.appendChild(snippet);
                }
                
                sourcesList.appendChild(sourceItem);
            });
        }

        // Display explanation with proper semantic markup
        explanation.innerHTML = `
            <h4 id="explanation-heading">Analysis Explanation</h4>
            <p role="article" aria-labelledby="explanation-heading">
                ${result.explanation}
            </p>
        `;

        // Animate confidence bar with ARIA updates
        setTimeout(() => {
            const confidenceFill = document.querySelector('.confidence-fill');
            if (confidenceFill) {
                confidenceFill.style.width = result.confidence + '%';
                // Update ARIA value during animation
                confidenceScore.querySelector('.confidence-value')
                    .setAttribute('aria-valuenow', result.confidence);
            }
        }, 100);
    }

    // Show message function
    function showMessage(type, text) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type} show`;
        message.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${text}`;
        
        // Insert message before tool content
        const toolContent = document.querySelector('.tool-content');
        if (toolContent) {
            toolContent.insertBefore(message, toolContent.firstChild);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                message.remove();
            }, 5000);
        }
    }

    // URL detection and validation
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Auto-detect URL and provide helpful text
    newsInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && isValidUrl(value)) {
            showMessage('success', 'URL detected. We will extract and analyze the article content.');
        }
    });

    // Keyboard shortcuts
    newsInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            verifyBtn.click();
        }
    });

    // Add character counter
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = `
        text-align: right;
        color: var(--text-muted);
        font-size: 0.8rem;
        margin-top: 0.5rem;
    `;
    newsInput.parentNode.appendChild(charCounter);

    newsInput.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = `${length} characters`;
        
        if (length > 5000) {
            charCounter.style.color = '#ef4444';
        } else if (length > 3000) {
            charCounter.style.color = '#f59e0b';
        } else {
            charCounter.style.color = 'var(--text-muted)';
        }
    });

    // Add placeholder text rotation
    const placeholders = [
        'Paste a news article URL or enter the text you want to verify...',
        'Enter a news headline or article content for authenticity check...',
        'Paste a URL from BBC, CNN, Reuters, or any news source...',
        'Type or paste the news content you want to fact-check...'
    ];

    let placeholderIndex = 0;
    setInterval(() => {
        if (document.activeElement !== newsInput) {
            newsInput.placeholder = placeholders[placeholderIndex];
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        }
    }, 3000);

    // Add input validation feedback
    newsInput.addEventListener('input', function() {
        const value = this.value.trim();
        const minLength = 10;
        
        if (value.length > 0 && value.length < minLength) {
            this.style.borderColor = '#f59e0b';
            showMessage('error', `Please enter at least ${minLength} characters for accurate analysis.`);
        } else {
            this.style.borderColor = '';
            const existingMessages = document.querySelectorAll('.message');
            existingMessages.forEach(msg => {
                if (msg.textContent.includes('characters')) {
                    msg.remove();
                }
            });
        }
    });
});

// API call to backend
async function verifyNewsWithAPI(input) {
    const API_ENDPOINT = 'http://localhost:8000/api/verify-news';
    
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: input,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Export functions for potential use in other scripts
window.NewsVerifier = {
    verifyNews: verifyNewsWithAPI,
    analyzeContent: function(input) {
        // This will be the actual analysis function
        return analyzeNewsContent(input);
    }
};
