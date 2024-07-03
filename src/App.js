import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import SearchResults from './components/SearchResults';
import TrademarkProducts from './components/TrademarkProducts';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
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

function App() {
  	return (
        <div className="App">
			<Main>
				<Routes>
					<Route path='/' element={ <MainPageContent /> } />

					<Route exact path="search/:searchFor/:category" element={ <SearchResults productsJSON={products} /> } />
					<Route exact path="trademark-search/:searchFor/:category" element={ <TrademarkProducts productsJSON={products} /> } />
					<Route exact path="product/:productId" element={ <ProductPage productsJSON={products} trademarks={trademarksIcons} /> } />
					<Route exact path="cart" element={ <Cart productsJSON={products} /> } />
					<Route exact path="favorites" element={ <Favorites productsJSON={products} /> } />
				</Routes>
			</Main>
    	</div>
  	);
}

export default App;