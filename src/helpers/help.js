export const getArticles = (articles, category) => {
  // Check if articles is defined and is an array
  if (!articles || !Array.isArray(articles)) {
    return []; // Return an empty array or handle the error as appropriate
  }

  // If a category is provided, filter articles by category
  const filteredArticles = category
    ? articles.filter(article => article.categorie_id === category)
    : articles;

  // You can include additional filtering or sorting logic here if needed

  return filteredArticles;
};




// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
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

//get products based on category
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


// get individual element
// Create a utility function to get individual articles from an array
export const getIndividualArticles = (articles) => {
  return articles.filter((article, index, self) =>
    self.findIndex((a) => a.id_art === article.id_art) === index
  );
};

// Utility function to get unique items from an array
export const getIndividualItemArray = (array) => {
  return array.filter((item, index, self) => self.indexOf(item) === index);
};

// Create a utility function to get individual categories from products
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.forEach((product) => {
      if (product.category) {
        product.category.forEach((single) => {
          productCategories.push(single);
        });
      }
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = products => {
  let productTags = [];
  products &&
    products.map(product => {
      return (
        product.tag &&
        product.tag.map(single => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = products => {
  let productColors = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = products => {
  let productSizes = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return single.size.map(single => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = product => {
  let productSizes = [];
  product.variation &&
    product.variation.map(singleVariation => {
      return (
        singleVariation.size &&
        singleVariation.size.map(singleSize => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
