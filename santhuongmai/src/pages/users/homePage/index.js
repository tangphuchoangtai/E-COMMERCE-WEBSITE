import { memo } from "react";
import MySpinner from "utils/formater";
// import Apis, { endpoint } from "configs/Apis";
import "./style.scss";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductPage from "../productPage";


const Home = () => {
  if ( Home === null) return <MySpinner />;
  return (
    <>

      <Carousel>
        <Carousel.Item className="slides">
          <img
            className="d-block w-100"
            src="https://images.vexels.com/content/194698/preview/shop-online-slider-template-4f2c60.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className="slides">
          <img
            className="d-block w-100"
            src="https://images.vexels.com/content/194731/preview/shop-online-web-slider-design-e2862a.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className="slides">
          <img
            className="d-block w-100"
            src="https://images.vexels.com/content/194701/preview/online-shopping-slider-template-d1aa6f.png"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
      
      <ProductPage></ProductPage>
      
    </>

  );
};

export default memo(Home);
