import { useSelector } from 'react-redux';



export const useArticleSelector = () => {
    return useSelector((state) => state.article.articles);
};


export const useCategorySelector = () => {
    return useSelector((state) => state.categorie.categories);
};


export const useSelectedCategorySelector = () => {
    return useSelector((state) => state.categorie.selectedCategory);
};


export const useCurrentUserSelector = () => {
    return useSelector((state) => state.user);
};


