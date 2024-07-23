'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/globals.css';
import Image from 'next/image';
import Navbar from './components/Navbar';

export default function HomePage() {
  interface Article {
    link: string;
    title: string;
    pubDate: string;
    image?: string;
    excerpt: string;
    content: string;
  }
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get(`/api/articles?page=${currentPage}`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    getArticles();
  }, [currentPage]);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsReading(true);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    setIsReading(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        {!isReading ? (
          <>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
              {articles.map((article) => (
                <div key={article.link} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
                  {article.image && (
                    <Image 
                      width={400} 
                      height={200} 
                      src={article.image} 
                      alt="Article Image" 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-[#2f1f49]">{article.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">{formatDate(article.pubDate)}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>
                    <button 
                      onClick={() => openArticle(article)}
                      className="inline-block px-4 py-2 bg-[#8bcfc8] text-white rounded-md hover:bg-[#43a096] transition-colors"
                    >
                      Read Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10 space-x-4">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1} 
                className="px-6 py-2 bg-[#8bcfc8] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#43a096] transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={nextPage} 
                className="px-6 py-2 bg-[#8bcfc8] text-white rounded-md hover:bg-[#43a096] transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : selectedArticle && (
          <div className="max-w-4xl mx-auto mt-14 px-4 sm:px-6 lg:px-8">
      <button
        onClick={closeArticle}
        className="mb-6 px-4 py-2 bg-[#43a096] text-white rounded-md hover:bg-[#43a096] transition-colors flex items-center"
      >
     
        Back to Articles
      </button>
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-[#2f1f49] font-serif">{selectedArticle.title}</h1>
          <p className="text-gray-600 text-sm mb-6 font-sans">Published on {formatDate(selectedArticle.pubDate)}</p>
          {selectedArticle.image && (
            <div className="mb-8">
              <Image
                width={800}
                height={400}
                src={selectedArticle.image}
                alt="Article cover"
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <div
            className="prose prose-lg max-w-none font-sans"
            dangerouslySetInnerHTML={{
              __html: selectedArticle.content.replace(/<img[^>]*>/g, '').replace(/<p/g, '<p class="mb-6"')
            }}
          />
          <a
            href={selectedArticle.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-6 py-3 bg-[#8bcfc8] text-white rounded-md hover:bg-[#43a096] transition-colors text-lg font-semibold"
          >
            Read on Medium
          </a>
        </div>
      </article>
    </div>
        )}
      </main>
    </>
  );
}