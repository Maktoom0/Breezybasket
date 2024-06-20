import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import SearchResults from './components/SearchResults';
import TrademarksIconsSlider from './components/TrademarksIconsSlider';
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

// let sentence = "lay's classic flavor"
// sentence.includes("lay") ? console.log("yes") : console.log("no")

function App() {
	// const trademarksProductsSliders = trademarksIcons.map((trademark) => <ProductsSlider productsJSON={products.filter((product) => product.trademark === trademark.name)} sliderTitle={trademark.name} />)
  	return (
        <div className="App">
			<Router>
				<Main>
					<Routes>
						<Route path='/' element={ 
							<>
							{/* favorites */}
								<TrademarksIconsSlider />
								<ProductsSlider productsJSON={products.filter((product) => product.offer > 50)} sliderTitle="Offers | more than 50%" />
								<CategoriesContainer />
								<ProductsSlider productsJSON={products.filter((product) => product.trademark === "lay's")} sliderTitle="Lay's" />
								<ProductsSlider productsJSON={products.filter((product) => product.trademark === "doritos")} sliderTitle="Doritos | New flavors available now !!" />
								<ProductsSlider productsJSON={products.filter((product) => product.evaluation > 4)} sliderTitle="High rates" />
							
							</>
						 } />
						 {/* product/chips-1 */}
						<Route path="search/:searchFor/:category" element={ <SearchResults productsJSON={products} /> } />
						<Route path="trademark-search/:searchFor" element={ <TrademarkProducts /> } />
						<Route path="product/:productId" element={ <ProductPage productsJSON={products} /> } />
						<Route path="cart" element={ <Cart productsJSON={products} /> } />
						<Route path="favorites" element={ <Favorites productsJSON={products} /> } />
					</Routes>
				</Main>
			</Router>
    	</div>
  	);
}

export default App;