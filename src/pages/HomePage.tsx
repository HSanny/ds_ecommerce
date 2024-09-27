import WelcomeBanner from "../components/WelcomeBanner";
import FeaturedProduct from "../components/products/FeaturedProduct";
import Services from "../components/Services";
import Contact from "../components/Contact";


const HomePage = () => {
    return (
        <main>
            <WelcomeBanner />
            <FeaturedProduct />
            <Services />
            <Contact />
        </main>
    )
}

export default HomePage;