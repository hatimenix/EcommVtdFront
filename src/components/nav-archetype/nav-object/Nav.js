import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSelectedCategory, selectCategory } from '../../../store/slices/categoriesSlice';
import { fetchArticlesByCategory } from '../../../services/fetchData';
import { useNavigate } from 'react-router-dom';
import CategoryItem from '../nav-item/CategoryItem';

function Nav() {
    const categories = useSelector((state) => state.categorie.categories);
    const selectedCategory = useSelector((state) => state.categorie.selectedCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            dispatch(fetchArticlesByCategory(categoryId));
            navigate(`/category/${categoryId}`);
            window.location.reload();
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
                            <img
                                src={process.env.PUBLIC_URL + "/assets/img/logo/dice.png"}
                                alt="Voir tout"
                            />
                        </span>
                        Voir tout
                    </span>
                </li>
                {parentCategories.map((parentCategory) => (
                    <CategoryItem
                        key={parentCategory.id_cat}
                        category={parentCategory}
                        selectedCategory={selectedCategory}
                        handleCategoryClick={handleCategoryClick}
                        expandedCategories={expandedCategories}
                    />
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
