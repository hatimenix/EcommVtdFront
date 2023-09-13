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


export const useRecSelector = () => {
    return useSelector((state) => state.rec.recs);
};


export const usePropsSelectore = () => {
    return useSelector((state) => state.propertie.properties);
};


export const usePkgSelectore = () => {
    return useSelector((state) => state.pkg.pkgs);
};