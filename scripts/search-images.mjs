const res = await fetch('https://www.bing.com/search?q=site%3Aunsplash.com%2Fphotos+electrician+man', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
});
const text = await res.text();
const matches = [...text.matchAll(/unsplash\.com\/photos\/([a-zA-Z0-9\-_]+)/g)].map(m => m[1]);
console.log('Bing matches:', [...new Set(matches)]);
