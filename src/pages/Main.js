import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsCartNumProvider from "../components/productsCartNumProvider";
import products from '../data/products.json'

export default function Main(props){

    return (
        <ProductsCartNumProvider>
            <Header productsJSON={products} />
                <div id="app-children-provider">{props.children}</div>
            <Footer />
        </ProductsCartNumProvider>
    );
};