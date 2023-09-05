import React from 'react';
import RenderSubcategories from '../sub-category/RenderSubCategory';

function CategoryItem({ category, selectedCategory, handleCategoryClick, expandedCategories }) {
    return (
        <li
            key={category.id_cat}
            className={`category-item ${selectedCategory === category.id_cat ? 'active' : ''}`}
        >
            <span
                className={`category-title`}
                onClick={() => handleCategoryClick(category.id_cat)}
            >
                {category.level !== 0 && (
                    <span className="category-icon">
                        <img src={category.icon} alt={category.titre} />
                    </span>
                )}
                {category.titre}
            </span>
            {expandedCategories.includes(category.id_cat) && (
                <RenderSubcategories parentCategoryId={category.id_cat} />
            )}
        </li>
    );
}

export default CategoryItem;
