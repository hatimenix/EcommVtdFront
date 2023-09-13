import React from 'react'
import { useArticleSelector, usePropsSelectore } from '../../../store/selectors/selectors';
import { Link } from 'react-router-dom';

export default function ArticleMarqueGrid() {





    const __articlesRec = useArticleSelector();
    // const __categoriesRec = useCategorySelector();



    const __props = usePropsSelectore()


    const marques = new Set(); // Create a Set to store unique articles
    const targetedCategories = new Set(); // Create a Set to store unique targeted categories


    let categoryId = null
    // If __recs is an array
    if (Array.isArray(__articlesRec)) {
        __articlesRec.forEach(ar__ => {




            __props.forEach(prop => {

                const correspondingMarque = __props.find(prp => (prp.article === ar__.id_art));

                if (correspondingMarque) {
                    // Add the article's id or a unique identifier to the Set
                    marques.add(correspondingMarque.marque);
                    categoryId = ar__.categorie_id
                    // Add the article's category to the targetedCategories Set
                }
            });
        })
    } else {
        console.log('Invalid __recs data.');
    }



    const ukMarques = Array.from(marques).map(article => {
        return __props.find(prp => (prp.article === article));
    });
    console.log("marques", marques);
    console.log("Id cat", categoryId);

    return (

        <Link to={process.env.PUBLIC_URL + '/category/' + categoryId}>

            {marques}
        </Link>



    )
}
