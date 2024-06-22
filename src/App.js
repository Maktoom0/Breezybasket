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

let spiroSpathisProducts = []
products.map(product => {
	product.trademark === "spiro spathis" ? spiroSpathisProducts.push(product) : console.log()
})

const getRandomElement = (arr) => {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

let array = [5, 6, 7, 8, 9, 10]

for (let i of array){
	const randomIndex = Math.floor(Math.random() * array.length);
	array[randomIndex] = i
	console.log(array)
}

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
								<ProductsSlider productsJSON={products.filter((product) => product.id.split("-")[0] === "juices")} sliderTitle="Cool Drinks" />
								<ProductsSlider productsJSON={products.filter((product) => product.trademark === "spiro spathis" || product.trademark === "double dare")} sliderTitle="Stand with poor children in Palestine" />
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