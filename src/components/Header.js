import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import categories from '../data/categories.json'
import './style/header.css'

import {ProductsCartNumberArray, ProductsFavArray} from "./productsCartContext";

export default function Header({productsJSON}){
    let [category, setCategory] = useState("all");
    let [inputValue, setInputValue] = useState("");
    let [searchHistory, setSearchHistory] = useState([]);
    let [searchDropdownClass, setSearchDropdownClass] = useState("undisplayed");
    const productsArra = JSON.parse(localStorage.getItem("productsCartArray"));
    const favArra = JSON.parse(localStorage.getItem("productsFavArray"));

    const {productsArray} = useContext(ProductsCartNumberArray)
    const {favArray} = useContext(ProductsFavArray)

    
    
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedSearchHistory = localStorage.getItem('searchHistory');

        if (storedSearchHistory) {setSearchHistory(JSON.parse(storedSearchHistory));}
        }, []);

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        if(inputRef.current){inputRef.current.blur()}
        if (inputValue.trim()) {
            setSearchHistory([...searchHistory, inputValue]);
            localStorage.setItem('searchHistory', JSON.stringify([...searchHistory, inputValue]));
            setInputValue('');
            navigate(`/search/${inputValue}/${category}`)

        } else {
            navigate("/");
            }
        };

    let categoriesObj = categories.map((element, index) => ({ id: index, value: element }));
    let searchHistoryObj = searchHistory.map((element, index) => ({ id: index, value: element }));

    searchHistoryObj = searchHistoryObj.reverse().slice(0, 6);

    const returnSearchHistoryVal = (searchHistoryEle) => {
        if (typeof(searchHistoryEle.value) === "object"){
            return searchHistoryEle.value.value
        } else { return searchHistoryEle.value }
    };

    const removeItem = (itemToRemove) => {
        const updatedItems = searchHistory.filter((item) => {
            if (typeof (item) === "object"){
                return item.value !== itemToRemove
            } else {return item !== itemToRemove}
        
        });
        localStorage.setItem("searchHistory", JSON.stringify(updatedItems));
        setSearchHistory(updatedItems);
    }
    const renderSearchDropdown = () => {
        if (inputValue === "") {
            if (searchHistoryObj.length > 0) {return searchHistoryElements} 
            else {return searchProposalsElements}
        } else { return searchSuggestionsElements }
    };

    const categoriesElements = categoriesObj.map((category) => <button type="button" key={category.id} onClick={() => {setCategory(category.value)}} className="category btn full-width">{category.value}</button>)
    const searchProposalsArray = productsJSON.filter((product) => product.evaluation > 4)
    const searchSuggestionsArray = (productsJSON.filter((product) => product.summary.toLowerCase().includes(inputValue.toLowerCase()))).filter((product) => {
        if (category === "all"){return product}
        else if (product.id.split("-")[0] === category){return product}
    })

    const searchHistoryElements = searchHistoryObj.map((searchHistoryEle) => 
    <div className="full-width flex align-items justify-content" key={searchHistoryEle.id}>
        <button type="button" className="to-search-input btn" onClick={() => {setInputValue(`${returnSearchHistoryVal(searchHistoryEle)}`); if(inputRef.current){inputRef.current.focus()}}}><i className="fa-solid fa-arrow-trend-up"></i></button>
        <a href={`/search/${encodeURIComponent(returnSearchHistoryVal(searchHistoryEle))}/${category}`}>{returnSearchHistoryVal(searchHistoryEle)}</a>
        <button type="button" className="remove-search-history-ele btn" onClick={() => {removeItem(returnSearchHistoryVal(searchHistoryEle))}}><i className="fa-solid fa-xmark"></i></button>
    </div>)

    const searchSuggestionsElements = searchSuggestionsArray.map((product) => 
        <div className="full-width flex align-items justify-content" key={product.id}>
            <button type="button" className="to-search-input btn" onClick={() => {setInputValue(`${product.summary}`); if(inputRef.current){inputRef.current.focus()}}}><i className="fa-solid fa-arrow-trend-up"></i></button>
            <a href={`/search/${encodeURIComponent(product.summary)}/${category}`}>{product.summary}</a>
        </div>)
        
    const searchProposalsElements = searchProposalsArray.map((product) => 
        <div className="full-width flex align-items justify-content" key={product.id}>
            <button type="button" className="to-search-input btn" onClick={() => {setInputValue(`${product.summary}`); if(inputRef.current){inputRef.current.focus()}}}><i className="fa-solid fa-arrow-trend-up"></i></button>
            <a href={`/search/${encodeURIComponent(product.summary)}/${category}`}>{product.summary}</a>
        </div>
    )   

    return (
        <header className="header full-width">
            <div className="upper-header flex align-items justify-content full-width">
                <a href="/" className="title">breezybasket</a>
                <div className="flex align-items">
                    <a href="/favorites" className="fav-area"><i className="fa-solid fa-heart"></i></a>

                    <a href="/cart" className="cart-area">
                        <p>{productsArra === null ? 0 : productsArra.length}</p>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </a>
                </div>
            </div>

            <div className="down-header full-width flex justify-content align-items">
                <a href="/" className="title">breezybasket</a>

                    <div className="search-area">
                        <form onSubmit={handleSearchFormSubmit} className="full-height full-width">
                            <div className="input-area full-width full-height">
                                <input ref={inputRef} className="full-height" placeholder={`Search in ${category}...`} 
                                    onFocus={() => {setSearchDropdownClass("displayed"); const appChildrenProvider = document.getElementById("app-children-provider"); appChildrenProvider.classList.add("blured-app"); }} 
                                    onBlur={() => {setSearchDropdownClass("undisplayed"); const appChildrenProvider = document.getElementById("app-children-provider"); appChildrenProvider.classList.remove('blured-app')}} value={inputValue} onChange={(event) => {setInputValue(event.target.value)}} />
                                
                                <button type="button" className="btn full-height">
                                    {category}
                                    <i className="fa-solid fa-chevron-down"></i>    
                                </button>

                                <div className="categories-dropdown absolute">{categoriesElements}</div>
                                <button type="submit" className="btn full-height"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </form>

                        <div className={`search-dropdown ${searchDropdownClass} full-width absolute`}>
                            {renderSearchDropdown()}
                        </div>
                    </div>

                    <div className="flex align-items">
                        <a href="/favorites" className="fav-area"><i className="fa-solid fa-heart"></i></a>

                        <a href="/cart" className="cart-area">
                            <p>{productsArra === null ? 0 : productsArra.length}</p>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </a>

                        <button className="header-bars btn pointer"><i className="fa-solid fa-bars"></i></button>
                        <div className="header-fc-dropdown absolute">
                            <a href="/cart" className="flex justify-content">
                                <div>cart <i className="fa-solid fa-cart-shopping"></i></div>
                                <p>{productsArra === null ? 0 : productsArra.length}</p>
                            </a>

                            <a href="/favorites" className="flex justify-content">
                                <div>favorites <i className="fa-solid fa-heart"></i></div>
                                <p>{favArra === null ? 0 : favArra.length}</p>
                            </a>
                        </div>
                    </div>
                </div>

        </header>
    );
};