import React, { useState, useEffect } from 'react';

function NewsAndIssues() {
  const [news, setNews] = useState([]);
  const [issues, setIssues] = useState([]);
  const [activeCategory, setActiveCategory] = useState('news');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = '/api/news-and-issues';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        const data = await response.json();
        setNews(data.news);
        setIssues(data.issues);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleItemClick = (link) => {
    window.open(link, '_blank');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  const renderList = (items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <button onClick={() => handleItemClick(item.link)}>{item.title}</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="rectangle">
      <h2 className="text-style">뉴스 & 이슈</h2>
      <div className="content">
        <div>
          <h3>뉴스</h3>
          <button onClick={() => handleCategoryClick('news')}>
            {activeCategory === 'news' ? '뉴스 숨기기' : '뉴스 보기'}
          </button>
          {activeCategory === 'news' && renderList(news)}
        </div>
        <div>
          <h3>다음 이슈</h3>
          <button onClick={() => handleCategoryClick('issues')}>
            {activeCategory === 'issues' ? '이슈 숨기기' : '이슈 보기'}
          </button>
          {activeCategory === 'issues' && renderList(issues)}
        </div>
      </div>
    </div>
  );
}

export default NewsAndIssues;
