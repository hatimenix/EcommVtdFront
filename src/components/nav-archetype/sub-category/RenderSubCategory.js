import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../nav-item/CategoryItem';
import { useNavigate } from 'react-router-dom';
import { selectCategory } from '../../../store/slices/categoriesSlice';
import { fetchArticlesByCategory } from '../../../services/fetchData';

function RenderSubcategories({ parentCategoryId }) {
    const categories = useSelector((state) => state.categorie.categories);

    const subcategories = categories.filter(
        (category) => category.parent_id === parentCategoryId
    );


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

    return (
        <ul className="sub-category-list">
            {subcategories.map((subcategory) => (
                <CategoryItem
                    key={subcategory.id_cat}
                    category={subcategory}
                    selectedCategory={selectedCategory}
                    handleCategoryClick={handleCategoryClick}
                    expandedCategories={expandedCategories}
                />
            ))}
        </ul>
    );
}

export default RenderSubcategories;
