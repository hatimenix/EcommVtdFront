// middleware.js

const recsMiddleware = store => next => action => {
    if (action.type === 'PROCESS_RECS') {
        const __articlesRec = store.getState().articlesRec; // Assuming articlesRec is in your Redux store
        const __recs = action.payload; // Assuming you dispatch an action with the recs data in payload

        const uniqueArticles = new Set();
        const targetedCategories = new Set();

        if (Array.isArray(__recs)) {
            __recs.forEach(rec => {
                const correspondingArticle = __articlesRec.find(article => article.id_art === rec.article);

                if (correspondingArticle) {
                    uniqueArticles.add(correspondingArticle.id_art);
                    targetedCategories.add(correspondingArticle.categorie_id);
                }
            });
        } else {
            console.log('Invalid __recs data.');
        }

        const targetedArticles = Array.from(uniqueArticles).map(id_art => {
            return __articlesRec.find(article => article.id_art === id_art);
        });

        const articlesRec__ = __articlesRec.filter(article => {
            return targetedCategories.has(article.categorie_id);
        });

        // Dispatch an action with the processed data
        store.dispatch({
            type: 'RECS_PROCESSED',
            payload: {
                targetedArticles,
                articlesRec__,
            },
        });

    }

    return next(action);
};

export default recsMiddleware;
