import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import SearchResults from './components/SearchResults';
import TrademarkProducts from './components/TrademarkProducts';
import ProductsSlider from './components/ProductsSlider';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';

import products from './data/products.json';
import trademarksIcons from './data/trademarksIcons.json';

import './App.css';
import './style/global.css';
import Favorites from './components/Favorites';
import CategoriesContainer from './components/CategoriesContainer';
import TrademarksContainer from './components/TrademarksContainer';

let spiroSpathisProducts = []
products.map(product => {
	if (product.trademark === "spiro spathis"){spiroSpathisProducts.push(product)}
})

function App() {
	// const trademarksProductsSliders = trademarksIcons.map((trademark) => <ProductsSlider productsJSON={products.filter((product) => product.trademark === trademark.name)} sliderTitle={trademark.name} />)
  	return (
        <div className="App">
			<Router>
				<Main>
					<Routes>
						<Route path='/' element={ 
							<>
								<TrademarksContainer />
								<ProductsSlider productsJSON={products.filter((product) => product.offer > 50)} sliderTitle="offers | more than 50%" />
								<ProductsSlider productsJSON={products.filter((product) => product.evaluation === 5)} sliderTitle="5 stars products" />
								<CategoriesContainer />
								<ProductsSlider productsJSON={products.filter((product) => product.trademark === "spiro spathis")} sliderTitle="spiro spathis | feel the real taste of juice" />
								<ProductsSlider productsJSON={products.filter((product) => product.trademark === "double dare")} sliderTitle="double dare with its new flavors" />
							</>
						 } />

						<Route path="search/:searchFor/:category" element={ <SearchResults productsJSON={products} /> } />
						<Route path="trademark-search/:searchFor" element={ <TrademarkProducts /> } />
						<Route path="product/:productId" element={ <ProductPage productsJSON={products} trademarks={trademarksIcons} /> } />
						<Route path="cart" element={ <Cart productsJSON={products} /> } />
						<Route path="favorites" element={ <Favorites productsJSON={products} /> } />
					</Routes>
				</Main>
			</Router>
    	</div>
  	);
}

export default App;