import { memo, useContext, useEffect, useState } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import MySpinner from "utils/formater";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Apis, { endpoints } from "configs/Apis";
import { AiFillCloseCircle } from "react-icons/ai";
import { formatter } from "utils/formater";
import cookie from "react-cookies";
import { MyCartContext } from "../../../router";
import { Link } from "react-router-dom";


const Products = () => {
  const [products, setProducts] = useState(null);
  const [cartCounter, cartdispatch] = useContext(MyCartContext);
  const [kw, setKw] = useState("");
  const nav = useNavigate();
  const [q] = useSearchParams();



  useEffect(() => {
    const loadProducts = async () => {
      try {
        let e = endpoints["products"];

        let cateId = q.get("cateId");
        if (cateId !== null) e = `${e}?cateId=${cateId}`;
        else {
          let kw = q.get("kw");
          if (kw !== null) e = `${e}?kw=${kw}`;
        }

        let res = await Apis.get(e);
        setProducts(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadProducts();
  }, [q]);

  // cập nhật với gọi điều kiện trong giỏ hàng (MyCartCounterReducer)
  const order = (products) => {
    cartdispatch({
      "type": "inc",
      "payload": 1
    });
    let cart = cookie.load("cart") || null
    if (cart === null)
      cart = {}
    if (products.id in cart) {
      // còn nếu có trong giỏ hàng thì tăng lên 1
      cart[products.id]['quantity'] += 1;
    } else {
      // nếu không có trong giỏ hàng
      cart[products.id] = {
        "id": products.id,
        "name": products.name,
        "quantity": 1,
        "unitPrice": products.price
      }
    }
    cookie.save("cart", cart);
    console.info(cart);
  }



  const search = (evt) => {
    evt.preventDefault();
    nav(`/san-pham?kw=${kw}`);
  };

  const [detail, setDetail] = useState([]);
  const [close, setClose] = useState(false);
  const detailPage = (Products) => {
    setDetail([{ ...Products }]);
    setClose(true);
  };

  if (products === null) return <MySpinner />;
  if (products.length === 0)
    return (
      <Alert variant="info" className="mt-5">
        Không có sản phẩm nào!
      </Alert>
    );


  return (
    <>
      {close ? (
        <div className="detail-container">
          <div className="detail-contant">
            <button className="close" onClick={() => setClose(false)}>
              <AiFillCloseCircle />
            </button>
            {detail.map((p) => {
              let url = `/san-pham/${p.id}`
              return (
                <>
                  <div className="detail-info">
                    <div className="img-box">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="img-box-pro"
                      ></img>
                    </div>
                    <div className="product-detail">
                      <h2>{p.name}</h2>
                      <h3>{formatter(p.price)}</h3>
                      <p>{p.description}</p>
                      {/* onClick={()=> onAddtoCartHandler(products)} */}
                      <Button variant="outline-danger"><Link to={url}>Bình Luận</Link></Button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="products">
        <h1 className="product-title"> DANH MỤC SẢN PHẨM</h1>
        <Form onSubmit={search} inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                placeholder="Nhập thông tin..."
                name="kw"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Tìm kiếm</Button>
            </Col>
          </Row>
        </Form>
      </div>

      <ul>
        <Row>
          {products.map((p) => {
            return (
              <Col xs={12} md={3} className="list-pro">
                <Card style={{ width: "300px" }}>
                  <Card.Img variant="top" src={p.image} />
                  <Card.Body className="items">
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>{formatter(p.price)}</Card.Text>
                    <Button variant="primary" onClick={() => detailPage(p)}>
                      Xem chi tiết
                    </Button>
                    <Button variant="success" onClick={() => order(p)} >Đặt hàng</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </ul>
    </>
  );
};

export default memo(Products);
