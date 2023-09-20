import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/template/header/Logo";
import NavMenu from "../../components/template/header/NavMenu";
import IconGroup from "../../components/template/header/IconGroup";
import MobileMenu from "../../components/template/header/MobileMenu";
import HeaderTop from "../../components/template/header/HeaderTop";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setArticleDetail, setArticles } from "../../store/slices/articlesSlice";
import { useArticleSelector } from "../../store/selectors/selectors";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Translate } from "@mui/icons-material";
import BlockIcon from '@mui/icons-material/Block';
import ClearIcon from "@mui/icons-material/Clear";
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import '../../assets/css/float.css'
import NestedNav from "../../components/nav-archetype/NavState";

const HeaderPkg = ({
    layout,
    top,
    borderStyle,
    headerPaddingClass,
    headerPositionClass,
    headerBgClass
}) => {
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    const articles = useArticleSelector()
    const dispatch = useDispatch();

    const [filteredArticles, setFilteredArticles] = useState([]);


    // console.log("Les arrrrrr", articles);
    // const f = articles.filter((article) =>
    //   article.hasOwnProperty("titre")
    // );

    // console.log("ijojhhihioihhhhohosiisisisisi", f);
    // f.forEach((article) => {
    //   console.log(article.titre);
    // });

    useEffect(() => {
        const header = document.querySelector(".sticky-bar");
        setHeaderTop(header.offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };


    const [selectedOption, setSelectedOption] = useState('Articles');
    const [searchText, setSearchText] = useState('');

    const clearSearchText = () => {
        setSearchText("");
        // Clear the filtered articles if needed
        // setFilteredArticles([]);
    };

    const handleDropdownChange = (selectedValue) => {
        setSelectedOption(selectedValue);
    };

    const handleSearchTextChange = (event) => {
        const newText = event.target.value.toLowerCase();
        setSearchText(newText);

        // Filter articles based on selectedOption and newText
        if (selectedOption === 'Articles') {
            const filtered = articles.filter((article) =>
                article.titre && article.titre.toLowerCase().startsWith(newText)
            );
            setFilteredArticles(filtered);
        } else if (selectedOption === 'Customers') {
            // Implement customer search logic here
        }
    };

    const handleSearch = () => {
        // Perform search based on selectedOption and searchText
        if (selectedOption === 'Articles') {
            const filteredArticles = articles.filter((article) =>
                article.titre.toLowerCase().startsWith(searchText.toLowerCase())
            );
            dispatch(setArticles(filteredArticles));
            // Search by articles
        } else if (selectedOption === 'Customers') {
            // Search by customers
        }
    };


    const navigate = useNavigate()


    return (
        <>





            <header className={clsx("header-area clearfix", headerBgClass, headerPositionClass)}>
                <div
                    className={clsx(
                        "header-top-area",
                        headerPaddingClass, top === "visible" ? "d-none d-lg-block" : "d-none",
                        borderStyle === "fluid-border" && "border-none"
                    )}
                >
                    <div className={layout === "container-fluid" ? layout : "container"}>
                        {/* header top */}
                        <HeaderTop borderStyle={borderStyle} />
                    </div>
                </div>



                <div
                    className={clsx(
                        headerPaddingClass,
                        "sticky-bar header-res-padding clearfix",
                        scroll > headerTop && "stick"
                    )}
                >
                    <div >
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-4 p-3">
                                {/* header logo */}
                                <Logo imageUrl={process.env.PUBLIC_URL + "/assets/img/logo/logo__.png"} logoClass="logo" />
                            </div>

                            <div className="col-xl-5 col-lg-5 col-md-3 d-none d-lg-block mt-2" style={{ position: 'relative' }}>
                                {/* Nav menu */}
                                <InputGroup style={{ width: '100%', minHeight: '20px', outline: "none", boxShadow: "none" }}>
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title={selectedOption}
                                        id="input-group-dropdown-1"
                                        size="sm"
                                        onSelect={(eventKey, event) => handleDropdownChange(eventKey)}
                                    >
                                        <Dropdown.Item eventKey="Articles">Articles</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="Customers">Customers</Dropdown.Item>
                                    </DropdownButton>
                                    <InputGroup.Text style={{ backgroundColor: "#f2f2f2", borderRight: "none" }}><AiOutlineSearch onClick={handleSearch} /></InputGroup.Text>
                                    <Form.Control
                                        style={{ backgroundColor: "#f2f2f2", borderLeft: "none", boxShadow: "none", height: 'fit-content', outline: "none", borderColor: "#dee2e6" }}
                                        placeholder={`Chercher des ${selectedOption.toLowerCase()}`}
                                        aria-label="Text input with dropdown button"
                                        value={searchText}
                                        onChange={handleSearchTextChange} // Handle input change
                                    />
                                    {searchText && ( // Render the Clear button when there's text in the search bar
                                        <Button variant="outline-secondary" onClick={clearSearchText}>
                                            <ClearIcon /> {/* Use the clear icon here */}
                                        </Button>
                                    )}
                                </InputGroup>
                            </div>


                            <div className="centered-floating-list">
                                {/* This container ensures that the cards float above other content */}


                                {searchText && searchText.length > 0 && (
                                    <>
                                        {selectedOption === 'Articles' && searchText && filteredArticles.length > 0 && (
                                            <div className="scrollable-list">
                                                <List sx={{ width: '100%', maxWidth: 300, bgcolor: '#fff', borderRadius: "10px" }}>
                                                    {filteredArticles.map((article, i) => {
                                                        const searchTextLower = searchText.toLowerCase();
                                                        const articleTitleLower = article.titre.toLowerCase();

                                                        // Check if the article title starts with the search text
                                                        if (!articleTitleLower.startsWith(searchTextLower)) {
                                                            return null; // Exclude this article if it doesn't match
                                                        }

                                                        const maxLength = 40; // Set your desired maximum length
                                                        const text = article.description;
                                                        const shouldShowTooltip = text.length > maxLength;
                                                        const tcTitle = shouldShowTooltip ? `${text.slice(0, maxLength)}...` : text;
                                                        const tooltipContent = shouldShowTooltip ? (
                                                            <Tooltip>
                                                                {text}
                                                            </Tooltip>
                                                        ) : null;

                                                        return (
                                                            <div
                                                                key={i}
                                                                style={{
                                                                    position: 'relative',
                                                                    zIndex: 1,
                                                                }}
                                                            >
                                                                <ListItem key={article.id_art} alignItems="flex-start">
                                                                    <Card sx={{
                                                                        maxWidth: 300,
                                                                        '&:hover': {
                                                                            backgroundColor: '#f0f0f0',
                                                                            cursor: 'pointer',
                                                                        },
                                                                    }} onClick={() => navigate(process.env.PUBLIC_URL + '/articles/' + article.id_art)}  >
                                                                        <CardHeader
                                                                            avatar={
                                                                                <Avatar alt="Remy Sharp" src={article.images[0].image} />
                                                                            }
                                                                            title={
                                                                                <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art}>
                                                                                    {article.titre}
                                                                                </Link>
                                                                            }
                                                                        />
                                                                        <CardContent>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art}>
                                                                                    {shouldShowTooltip ? (
                                                                                        <OverlayTrigger placement="top" overlay={tooltipContent}>
                                                                                            <span>{tcTitle}</span>
                                                                                        </OverlayTrigger>
                                                                                    ) : (
                                                                                        <span>{text}</span>
                                                                                    )}
                                                                                </Link>
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Card>
                                                                </ListItem>
                                                                <Divider sx={{
                                                                    backgroundColor: '#fff',
                                                                    marginLeft: "-1px",
                                                                    marginTop: "5px"
                                                                }} variant="inset" component="li" />
                                                            </div>
                                                        )
                                                    })}
                                                </List>
                                            </div>
                                        )}


                                    </>
                                )}


                            </div>

                            <div className="centered-floating-list-nf">
                                {searchText && searchText.length > 0 && (
                                    <>


                                        {selectedOption === 'Articles' && searchText && filteredArticles.length === 0 && (

                                            <List sx={{ width: '100%', maxWidth: 300, bgcolor: '#fff', borderRadius: "10px" }}>
                                                {filteredArticles.map((article, i) => {
                                                    const searchTextLower = searchText.toLowerCase();
                                                    const articleTitleLower = article.titre.toLowerCase();

                                                    // Check if the article title starts with the search text
                                                    if (!articleTitleLower.startsWith(searchTextLower)) {
                                                        return null; // Exclude this article if it doesn't match
                                                    }

                                                    const maxLength = 40; // Set your desired maximum length
                                                    const text = article.description;
                                                    const shouldShowTooltip = text.length > maxLength;
                                                    const tcTitle = shouldShowTooltip ? `${text.slice(0, maxLength)}...` : text;
                                                    const tooltipContent = shouldShowTooltip ? (
                                                        <Tooltip>
                                                            {text}
                                                        </Tooltip>
                                                    ) : null;

                                                    return (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                position: 'relative',
                                                                zIndex: 1,
                                                            }}
                                                        >
                                                            <ListItem key={article.id_art} alignItems="flex-start">
                                                                <Card sx={{
                                                                    maxWidth: 300,
                                                                    '&:hover': {
                                                                        backgroundColor: '#f0f0f0',
                                                                        cursor: 'pointer',
                                                                    },
                                                                }} onClick={() => navigate(process.env.PUBLIC_URL + '/articles/' + article.id_art)}  >
                                                                    <CardHeader
                                                                        avatar={
                                                                            <Avatar alt="Remy Sharp" src={article.images[0].image} />
                                                                        }
                                                                        title={
                                                                            <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art}>
                                                                                {article.titre}
                                                                            </Link>
                                                                        }
                                                                    />
                                                                    <CardContent>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art}>
                                                                                {shouldShowTooltip ? (
                                                                                    <OverlayTrigger placement="top" overlay={tooltipContent}>
                                                                                        <span>{tcTitle}</span>
                                                                                    </OverlayTrigger>
                                                                                ) : (
                                                                                    <span>{text}</span>
                                                                                )}
                                                                            </Link>
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            </ListItem>
                                                            <Divider sx={{
                                                                backgroundColor: '#fff',
                                                                marginLeft: "-1px",
                                                                marginTop: "5px"
                                                            }} variant="inset" component="li" />
                                                        </div>
                                                    )
                                                })}

                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <BlockIcon style={{ fontSize: 28, color: '#ccc' }} />
                                                    <Typography variant="body1" color="gray">
                                                        Aucun article n'a été trouvé.
                                                    </Typography>
                                                </Box>
                                            </List>


                                        )}
                                    </>
                                )}
                            </div>


                            <div className="col-xl-5 col-lg-6 col-md-3 col-sm-4 d-none d-sm-block d-md-none d-xl-none d-lg-none" ></div>
                            <div className="col-xl-5 col-lg-5 col-md-9 col-sm-5 col-8 mt-3">
                                {/* Icon group */}
                                <IconGroup />
                            </div>
                        </div>

                    </div>
                    {/* mobile menu */}

                    <MobileMenu />


                </div>
            </header>

            {/* <div className="col-xl-6 col-lg-6 d-none d-lg-block mt-2">
        {selectedOption === 'Articles' &&

          searchText &&
          filteredArticles.map((article) => (
            <div key={article.id}>{article.titre}</div>
          ))}
      </div> */}
            {/* 
      <div style={{ position: 'absolute', top: '0', left: '0', right: '0', zIndex: '999' }}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {selectedOption === 'Articles' && searchText &&
            filteredArticles.map((article, i) => {
              const maxLength = 40; // Set your desired maximum length
              const text = article.description;
              const shouldShowTooltip = text.length > maxLength;
              const tcTitle = shouldShowTooltip ? `${text.slice(0, maxLength)}...` : text;
              const tooltipContent = shouldShowTooltip ? (
                <Tooltip >
                  {text}
                </Tooltip>
              ) : null;

              return (
                <div
                  key={i}
                  style={{
                    position: 'relative', // Make the container relative for positioning
                    zIndex: 1, // Set a higher z-index to make it appear above other content
                    marginBottom: '20px', // Add spacing between cards
                  }}
                >
                  <ListItem key={article.id_art} alignItems="flex-start">
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          <Avatar alt="Remy Sharp" src={article.images[0].image} />
                        }
                        title={
                          <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art}>
                            {article.titre}
                          </Link>
                        }
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art}>
                            {shouldShowTooltip ? (
                              <OverlayTrigger placement="top" overlay={tooltipContent}>
                                <span>{tcTitle}</span>
                              </OverlayTrigger>
                            ) : (
                              <span>{text}</span>
                            )}
                          </Link>
                        </Typography>
                      </CardContent>
                    </Card>
                    <Divider variant="inset" component="li" />
                  </ListItem>
                </div>
              )
            })
          }
        </List>
      </div> */}


        </>
    );
};

HeaderPkg.propTypes = {
    borderStyle: PropTypes.string,
    headerPaddingClass: PropTypes.string,
    headerPositionClass: PropTypes.string,
    layout: PropTypes.string,
    top: PropTypes.string
};

export default HeaderPkg;
