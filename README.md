# News Authenticity Checker - AI Project

An AI-powered tool that analyzes news articles and URLs to determine their authenticity by cross-referencing with trusted sources.

## 🚀 Features

- **URL & Text Analysis**: Accept both URLs and raw text for verification
- **AI-Powered Claims Extraction**: Uses advanced NLP to identify key claims
- **Multi-Source Verification**: Cross-references with trusted news sources
- **Confidence Scoring**: Provides detailed confidence metrics
- **Real-time Results**: Fast analysis with visual feedback
- **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Modern CSS with CSS Grid and Flexbox
- Font Awesome icons
- Responsive design

### Backend
- Python 3.8+
- FastAPI (async web framework)
- Pydantic (data validation)
- aiohttp (async HTTP client)
- BeautifulSoup4 (web scraping)
- OpenAI API (AI analysis)

## 📁 Project Structure

```
entora.space/
├── index.html              # Main homepage
├── ai-projects.html        # AI Projects page
├── join.html              # Join us page
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript
├── ai-projects.js         # AI Projects functionality
├── backend/               # Backend API
│   ├── main.py           # FastAPI application
│   ├── start_server.py   # Server startup script
│   ├── requirements.txt  # Python dependencies
│   └── env_example.txt   # Environment variables template
└── README.md             # This file
```

## 🚀 Quick Start

### Frontend Setup
1. Open `index.html` in your web browser
2. Navigate to "AI Projects/Tools" to access the news checker
3. Enter a URL or text to verify

### Backend Setup (Optional)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp env_example.txt .env
   # Edit .env with your API keys
   ```

4. Start the backend server:
   ```bash
   python start_server.py
   ```

5. The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory with:

```env
# Server Configuration
HOST=0.0.0.0
PORT=8000
RELOAD=true

# API Keys (optional for demo)
OPENAI_API_KEY=your_openai_api_key_here
BING_SEARCH_API_KEY=your_bing_search_api_key_here
NEWS_API_KEY=your_news_api_key_here
```

### API Keys Setup
For full functionality, you'll need:

1. **OpenAI API Key**: For advanced text analysis
2. **Bing Search API Key**: For web search capabilities
3. **News API Key**: For news source access

## 🎯 How It Works

1. **Input Processing**: User provides URL or text
2. **Content Extraction**: System extracts main claims using AI
3. **Source Search**: Searches trusted news sources and fact-checkers
4. **Evidence Analysis**: Compares claims with found sources
5. **Confidence Scoring**: Calculates reliability score
6. **Result Display**: Shows verdict, confidence, and sources

## 🔍 API Endpoints

### POST `/api/verify-news`
Verify news content or URL

**Request:**
```json
{
  "input": "https://example.com/news-article",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Response:**
```json
{
  "verdict": {
    "type": "true",
    "text": "Likely True"
  },
  "confidence": 85,
  "sources": [
    {
      "title": "BBC News - Related Coverage",
      "url": "https://www.bbc.com/news/example",
      "reliability": "high",
      "snippet": "Official sources confirm..."
    }
  ],
  "explanation": "Analysis explanation...",
  "processing_time": 2.34
}
```

### GET `/api/sources`
Get list of trusted sources

## 🎨 Customization

### Styling
- Modify `style.css` for visual changes
- CSS variables are defined in `:root` for easy theming
- Responsive breakpoints at 768px and 480px

### Functionality
- Edit `ai-projects.js` for frontend behavior
- Modify `backend/main.py` for API logic
- Add new verification sources in the backend

## 🚧 Future Enhancements

- [ ] Real-time fact-checking with live news feeds
- [ ] Machine learning model training on user feedback
- [ ] Multi-language support
- [ ] Browser extension
- [ ] Mobile app
- [ ] Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of entora.space and is proprietary software.

## 📞 Contact

- Email: entoraofficial@gmail.com
- Website: entora.space

---

**Note**: This is a demonstration project. For production use, implement proper security measures, rate limiting, and error handling.
