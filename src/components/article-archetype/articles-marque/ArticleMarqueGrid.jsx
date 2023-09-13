import React from 'react';
import { useArticleSelector, usePropsSelectore } from '../../../store/selectors/selectors';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function ArticleMarqueGrid() {
    const __articlesRec = useArticleSelector();
    const __props = usePropsSelectore();
    const marques = new Set(); // Create a Set to store unique articles

    let categoryId = null;

    // If __articlesRec is an array
    if (Array.isArray(__articlesRec)) {
        __articlesRec.forEach(ar__ => {
            __props.forEach(prop => {
                const correspondingMarque = __props.find(prp => prp.article === ar__.id_art);
                if (correspondingMarque) {
                    // Add the article's id or a unique identifier to the Set
                    marques.add(correspondingMarque.marque);
                    categoryId = ar__.categorie_id;
                    // Add the article's category to the targetedCategories Set
                }
            });
        });
    } else {
        console.log('Invalid __articlesRec data.');
    }

    // Convert the Set to an array (myArray)
    const myArray = Array.from(marques);

    const uniqueMarques = Array.from(new Set(myArray)); // Remove duplicates from myArray

    const items = uniqueMarques.map((item, index) => {
        const matchingProps = __props.filter(prp => prp.marque === item);
        return (
            <Link
                to={process.env.PUBLIC_URL + '/category/' + categoryId} // Make sure this is the correct categoryId for the current item
                key={index}
                style={{ textDecoration: 'none' }}
            >
                <ListItem
                    style={{ transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = 'gray'}
                    onMouseLeave={e => e.target.style.color = 'initial'}
                >
                    <ListItemText
                        style={{
                            marginRight: '0px',
                            border: '1px solid gray',
                            padding: '5px',
                            borderRadius: '5px'
                        }}
                        primary={item} // Use the current item (marque) here
                    />
                </ListItem>
            </Link>
        );
    });

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {items}
        </div>
    );
}
