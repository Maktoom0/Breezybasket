import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import SearchResults from './components/SearchResults';
import TrademarkProducts from './components/TrademarkProducts';
import ProductsSlider from './components/ProductsSlider';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import HowToContainer from './components/HowToContainer';
import TrademarksContainer from './components/TrademarksContainer';
import CategoriesContainer from './components/CategoriesContainer';
import Favorites from './components/Favorites';

import products from './data/products.json';
import trademarksIcons from './data/trademarksIcons.json';

import './App.css';
import './style/global.css';
import MainPageContent from './pages/MainPageContent';

let spiroSpathisProducts = []
products.map(product => {
	if (product.trademark === "spiro spathis"){spiroSpathisProducts.push(product)}
})

if (window.location.href === "/"){
	window.location.href = "/breezybasket"
}



function App() {
	// const trademarksProductsSliders = trademarksIcons.map((trademark) => <ProductsSlider productsJSON={products.filter((product) => product.trademark === trademark.name)} sliderTitle={trademark.name} />)
  	return (
        <div className="App">
			<Router>
				<Main>
					<Routes>
						<Route path='/' element={ <MainPageContent /> } />
						<Route path='/breezybasket' element={ <MainPageContent /> } />

						<Route path="/breezybasket/search/:searchFor/:category" element={ <SearchResults productsJSON={products} /> } />
						<Route path="/breezybasket/trademark-search/:searchFor/:category" element={ <TrademarkProducts productsJSON={products} /> } />
						<Route path="/breezybasket/product/:productId" element={ <ProductPage productsJSON={products} trademarks={trademarksIcons} /> } />
						<Route path="/breezybasket/cart" element={ <Cart productsJSON={products} /> } />
						<Route path="/breezybasket/favorites" element={ <Favorites productsJSON={products} /> } />
					</Routes>
				</Main>
			</Router>
    	</div>
  	);
}

export default App;