// Create a utility function to filter and sort articles
export const getArticles = (articles, category, type, limit) => {
  // If a category is provided, filter articles by category
  const filteredArticles = category
    ? articles.filter(article => article.categorie_id === category)
    : articles;

  // Check the type and apply corresponding filters/sorting
  if (type === "new") {
    const newArticles = filteredArticles.filter(article => article.is_new);
    return newArticles.slice(0, limit || newArticles.length);
  } else if (type === "bestSeller") {
    return filteredArticles
      .sort((a, b) => b.saleCount - a.saleCount)
      .slice(0, limit || filteredArticles.length);
  } else if (type === "saleItems") {
    const saleItems = filteredArticles.filter(article => article.discount > 0);
    return saleItems.slice(0, limit || saleItems.length);
  }

  // Return all filtered articles if no specific type is provided
  return filteredArticles.slice(0, limit || filteredArticles.length);
};


// Create a utility function to get the cart quantity for articles
export const getArticleCartQuantity = (cartItems, article) => {
  // Find the article in the cart that matches the provided article
  const articleInCart = cartItems.find(
    (single) => single.id_art === article.id_art
  );

  // If the article is in the cart, return its quantity, otherwise return 0
  return articleInCart ? articleInCart.quantity : 0;
};

// Create a utility function to get the stock of an article variation
export const articleVariationStock = (article, color, size) => {
  // Check if the article has stock defined
  if (article.stock) {
    return article.stock;
  } else {
    // If the article has variations, find the stock of the specified color and size
    const variation = article.variation.find(
      (v) => v.color === color && v.size === size
    );
    return variation ? variation.stock : 0;
  }
};


// Create a utility function to get sorted articles
export const getSortedArticles = (articles, sortType, sortValue) => {
  if (articles && sortType && sortValue) {
    if (sortType === "category") {
      return articles.filter(
        (article) => article.categorie_id === sortValue
      );
    }
    if (sortType === "tag") {
      return articles.filter(
        (article) => article.tag.filter((tag) => tag === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return articles.filter(
        (article) =>
          article.variation &&
          article.variation.filter((variation) => variation.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return articles.filter(
        (article) =>
          article.variation &&
          article.variation.filter((variation) =>
            variation.size.find((size) => size.name === sortValue)
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortArticles = [...articles];
      if (sortValue === "default") {
        return sortArticles;
      }
      if (sortValue === "priceHighToLow") {
        return sortArticles.sort((a, b) => {
          return b.prix_vente - a.prix_vente;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortArticles.sort((a, b) => {
          return a.prix_vente - b.prix_vente;
        });
      }
    }
  }
  return articles;
};


  const currentArticle = useSelector((state) => state.article.articleDetail);
  const allArticles = useSelector((state) => state.article.articles);
  const [filteredArticles,setFilteredArticles] = useState([])

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  // Ensure that currentCategory is correctly assigned or handle null values
  const currentCategory = currentArticle ? currentArticle.categorie : null;

  // Define an array to store filtered related articles
  // let filteredArticles = [];

  useEffect(() => {
    // Fetch related articles by category if the current category is available
    if (currentCategory) {
      // Filter articles based on related_article IDs and category
      const filtered = allArticles.filter((article) =>
         article.categorie === currentCategory
        
      );
      console.log("useeffect articles:", filtered)
      setFilteredArticles(filtered)
    }
  }, [dispatch, currentCategory, currentArticle, allArticles, articleId]);


            {/* Related articles */}
            {filteredArticles.length > 0 ? (
              <div className="related-articles">
                <h2>Related Articles</h2>
                <ul>
                  {/* Map through filtered articles and render them */}
                  {filteredArticles.map((article) => (
                    <li key={article.id_art}>
                      <a href={`/${article.id_art}`}>{article.titre}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}