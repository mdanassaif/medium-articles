'use client'


import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/globals.css';
import Image from 'next/image';

export default function HomePage() {
  interface Article {
    link: string;
    title: string;
    pubDate: string;
    image?: string;
    excerpt: string;
  }
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <main className="container mx-auto p-4 mt-[10rem] ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.link} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#d0ebe9]">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{new Date(article.pubDate).toLocaleDateString()}</p>
            {article.image && <Image width={48} height={48} src={article.image} alt="Article Image" quality={100} className="w-full h-48 object-cover mb-4 rounded-lg" />}
            <p className="text-sm">{article.excerpt}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 inline-block">
              Read more
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-10 ">
        <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 px-4 py-2 bg-[#8bcfc8] text-black rounded-lg">
          Previous
        </button>
        <button onClick={nextPage} className="px-4 py-2 bg-[#8bcfc8]  text-black rounded-lg">
          Next
        </button>
      </div>
    </main>
  );
}
