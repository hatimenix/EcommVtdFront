import React, { useState } from 'react';

function CategorySelect({ onChange }) {
  const categories = [
    { "id": 1, "name": "Category 1", "level": 0 },
    { "id": 2, "name": "Category 2", "level": 0 },
    { "id": 3, "name": "Subcategory 1-1", "level": 1, "parent_id": 1 },
    { "id": 4, "name": "Subcategory 1-2", "level": 1, "parent_id": 1 },
    { "id": 5, "name": "Subcategory 2-1", "level": 1, "parent_id": 2 }
    // ... other categories ...
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = event => {
    const selectedCategoryId = parseInt(event.target.value);
    setSelectedCategory(selectedCategoryId);
    onChange(selectedCategoryId);
  };

  const filteredCategories = selectedCategory
    ? categories.filter(category => category.parent_id === selectedCategory)
    : categories.filter(category => category.level === 0);

  return (
    <select onChange={handleCategoryChange}>
      <option value="">Select a category</option>
      {filteredCategories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;
