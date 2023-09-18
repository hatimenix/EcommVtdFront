import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSelectedCategory, selectCategory } from '../../store/slices/categoriesSlice';
import { setArticles } from '../../store/slices/articlesSlice';
import { fetchArticles, fetchArticlesByCategory } from '../../services/fetchData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/catnav.css';
import { useTranslation } from 'react-i18next';

const NestedNav = () => {
  const categories = useSelector((state) => state.categorie.categories);
  const selectedCategory = useSelector((state) => state.categorie.selectedCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expandedCategories, setExpandedCategories] = useState([]);

  const [catId, setCatId] = useState()

  const getCategories = (id) => {
    const table = categories.filter(e => e.parent_id === (id))
    return table
  }

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
      window.location.reload()
    }
  };

  const reloadAllArticles = async () => {
    try {
      localStorage.removeItem('selectedCategory');

      dispatch(resetSelectedCategory());
      navigate(`/`);
      window.location.reload()


    } catch (error) {
      console.error('Error reloading articles:', error);
    }
    navigate(`/`);
  };

  const renderSubcategories = (parentCategoryId) => {
    const subcategories = categories.filter((category) => category.parent_id === parentCategoryId);
    let test_id = subcategories[0].id_cat
    if (catId) {
      test_id = null
    }

    return (
      <ul className="mega-menu" style={{ display: "flex", flexDirection: "row" }} >
        <ul style={{ display: "flex", flexDirection: "column", borderRight: '1px solid #ebebeb', margin: '5px 0px 5px 0px', width: "30%" }}>
          {subcategories.map((subcategory) => (
            <li
              // style={{width:"30%",display:'flex',flexDirection:'column'}}
              key={subcategory.id_cat}
            >
              <Link style={{ color: "#555252" }} onClick={() => {
                setCatId(subcategory.id_cat)
              }}>

                <span className="category-icon">
                  <img src={subcategory.icon} />
                </span>
                <span style={{ height: "10px" }}>{subcategory.titre}</span>

              </Link>

              {/* {expandedCategories.includes(subcategory.id_cat) && renderSubcategories(subcategory.id_cat)} */}

            </li>
          ))}
        </ul>
        {/* <ul style={{ display: "flex", flexDirection: "column", margin: '5px 0px 5px 10px', width: '80%' }}> */}

          <li style={{width:"70%"}}  className='text-left' >
            {getCategories(catId ? catId : test_id).map((val, key) => {
              return (
                <li style={{width:"50%"}}>
                  <Link onClick={() => handleCategoryClick(val.id_cat, val.level)} style={{ color: "#555252" }}>

                    {val.titre}
                  </Link>
                </li>
              )
            })}
          </li>


          {/* {subcategories.map((subcategory) => (
          <li

            key={subcategory.id_cat}
          >
            <Link onClick={() => handleCategoryClick(subcategory.id_cat, subcategory.level)}>

              <span className="category-icon">
                                <img src={subcategory.icon} />
                            </span>
              {subcategory.titre}
            </Link>

            {expandedCategories.includes(subcategory.id_cat) && renderSubcategories(subcategory.id_cat)}

          </li>
        ))} */}
        {/* </ul> */}

      </ul>

      // <ul className='mega-menu ' style={{backgroundColor:'yellow'}}>
      //   <li className='' style={{backgroundColor:'brown',width:'30%'}}>
      //     rfzkefvksdvk,
      //   </li>
      //   <li className='text-center' style={{backgroundColor:'green' ,width:'70%' }}>
      //     <li style={{width:'50%' , backgroundColor:'red'}}>sdsdf</li>
      //     <li style={{width:'50%' , backgroundColor:'red'}}>sdsdf</li>
      //   </li>
      // </ul>
    );
  };



  const parentCategories = categories.filter((category) => category.parent_id === null);

  return (
    <div className={"main-menu d-none d-lg-block "}>
      <nav >
        <ul>
          <li>
            <Link onClick={() => reloadAllArticles()}>
              <span className="category-icon-all">
                <img src={process.env.PUBLIC_URL + "/assets/img/logo/dice.png"} />
              </span>
              Voir tout
            </Link>
          </li>
          {parentCategories.map((parentCategory, key) => (
            <li
              key={parentCategory.id_cat}
            >
              <Link
                onMouseEnter={() => { setCatId() }}
                onClick={() => { handleCategoryClick(parentCategory.id_cat) }} >

                {parentCategory.level !== 0 && (
                  <span className="category-icon">
                    <img src={parentCategory.icon} />
                  </span>
                )}
                {parentCategory.titre}
                <i className="fa fa-angle-down" />
              </Link>
              {expandedCategories.includes(parentCategory.id_cat) && renderSubcategories(parentCategory.id_cat)}
            </li>
          ))}
        </ul>
      </nav>
    </div>

  );
};

export default NestedNav;
