import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSelectedCategory, selectCategory } from '../store/slices/categoriesSlice';
import { setArticles } from '../store/slices/articlesSlice';
import { fetchArticles, fetchArticlesByCategory } from '../services/fetchData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/catnav.css';

const CatNav = () => {
    const categories = useSelector((state) => state.categorie.categories);
    const selectedCategory = useSelector((state) => state.categorie.selectedCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook to handle navigation
    const params = useParams(); // Hook to get URL parameters




    console.log("selectedCategory ", selectedCategory);

    const [expandedCategories, setExpandedCategories] = useState([]);







    const handleCategoryClick = (categoryId, categoryLevel) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter((id) => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
        if (categoryLevel === 2) {
            const selectedCat = categories.find((category) => category.id_cat === categoryId);
            dispatch(selectCategory({ id_cat: categoryId }));
            dispatch(fetchArticlesByCategory(categoryId)); // Fetch articles for the selected category
            navigate(`/category/${categoryId}`);
            window.location.reload() // Navigate to the category path

        }
    };

    const reloadAllArticles = async () => {
        try {
            localStorage.removeItem('selectedCategory'); // Remove selected category from localStorage

            // Reset the selected category
            dispatch(resetSelectedCategory());
            navigate(`/`);
            // Fetch all articles again
            window.location.reload()


        } catch (error) {
            console.error('Error reloading articles:', error);
        }
        navigate(`/`);
    };

    const renderSubcategories = (parentCategoryId) => {
        const subcategories = categories.filter((category) => category.parent_id === parentCategoryId);

        return (
            <ul className="sub-category-list">
                {subcategories.map((subcategory) => (
                    <li
                        key={subcategory.id_cat}
                        className={`sub-category-item ${selectedCategory === subcategory.id_cat ? 'active' : ''}`}
                    >
                        <span
                            className={`sub-category-title`}
                            onClick={() => handleCategoryClick(subcategory.id_cat, subcategory.level)}
                        >
                            <span className="category-icon">
                                <img src={subcategory.icon} />
                            </span>
                            {subcategory.titre}
                        </span>
                        {expandedCategories.includes(subcategory.id_cat) && renderSubcategories(subcategory.id_cat)}
                    </li>
                ))}
            </ul>
        );
    };

    const parentCategories = categories.filter((category) => category.parent_id === null);

    return (
        <nav className="category-nav">
            <ul className="category-list">
                <li className={`parcat`}>
                    <span
                        className={`category-title-all`}
                        onClick={() => reloadAllArticles()}
                    >
                        <span className="category-icon-all">
                            <img src={process.env.PUBLIC_URL + "/assets/img/logo/dice.png"} />
                        </span>
                        Voir tout
                    </span>
                </li>
                {parentCategories.map((parentCategory) => (
                    <li
                        key={parentCategory.id_cat}
                        className={`category-item ${selectedCategory === parentCategory.id_cat ? 'active' : ''}`}
                    >
                        <span
                            className={`category-title`}
                            onClick={() => handleCategoryClick(parentCategory.id_cat)}
                        >
                            {parentCategory.level !== 0 && ( // Check the level before rendering the icon
                                <span className="category-icon">
                                    <img src={parentCategory.icon} />
                                </span>
                            )}
                            {parentCategory.titre}
                        </span>
                        {expandedCategories.includes(parentCategory.id_cat) && renderSubcategories(parentCategory.id_cat)}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CatNav;
