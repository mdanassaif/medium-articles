import axios from 'axios';
import cheerio from 'cheerio';
import { Request, Response } from 'express';


const fetchMediumArticles = async (page = 1, limit = 9) => {
  const mediumUsername = 'anassaifen'; // Replace with your Medium username
  const mediumRSSFeed = `https://${mediumUsername}.medium.com/feed?page=${page}`;
 
  try {
    const response = await axios.get(mediumRSSFeed);
    const feed = response.data;

    const $ = cheerio.load(feed, { xmlMode: true });
    const articles = $('item').map((_, item) => ({
      title: $(item).find('title').text(),
      link: $(item).find('link').text(),
      pubDate: $(item).find('pubDate').text(),
      content: $(item).find('content\\:encoded').text(), // Full content
      image: extractImage($(item).find('content\\:encoded').text()),
      excerpt: extractExcerpt($(item).find('content\\:encoded').text(), 150), // Adjust length as needed
    })).get();

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return articles.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching Medium RSS feed:', error);
    throw error;
  }
};

const extractExcerpt = (content: string, maxLength = 200) => {
  const $ = cheerio.load(content); // Load HTML content with cheerio
  const paragraph = $('p').first().text(); // Extract text from the first paragraph
  return paragraph.length > maxLength ? paragraph.substring(0, maxLength) + '...' : paragraph;
};

const extractImage = (content: string) => {
  const $ = cheerio.load(content); // Load HTML content with cheerio
  const imgElement = $('img').first();
  return imgElement.attr('src');
};
const fetchArticlesHandler = async (req: Request, res: Response) => {
  try {
    let page: string;
if (typeof req.query.page === 'string') {
  page = req.query.page;
} else {
  page = '1';  
}
    const articles = await fetchMediumArticles(parseInt(page));
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching Medium articles', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching Medium articles', error: 'Unknown error' });
    }
  }
}

export default fetchArticlesHandler;
