import Apis, { authApi, endpoints } from "configs/Apis";
import { useEffect, useState, useContext } from "react";
import { Button, Form, Image, ListGroup } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import Myspinner, { formatter } from "utils/formater";
import module from "./Comment.module.css"
import cookie from "react-cookies";
import { MyCartContext, MyUserContext } from "../../router";
import clsx from "clsx";

const Comment = () => {
    const { productId } = useParams();
    const [user,] = useContext(MyUserContext)
    const [product, setProduct] = useState(null);
    const [, cartdispatch] = useContext(MyCartContext);
    const [comment, setComment] = useState(null);
    const [content, setContent] = useState();




    useEffect(() => {
        const loadProducts = async () => {
            try {
                let { data } = await Apis.get(endpoints["details"](productId));
                setProduct(data)
            } catch (ex) {
                console.error(ex)
            }
        }
        loadProducts()
    }, [])


    useEffect(() => {
        const loadComment = async () => {
            try {
                let { data } = await Apis.get(endpoints['comment-product'](productId));
                setComment(data);
            }
            catch (ex) {
                console.error(ex);
            }
        };

        loadComment();
    }, [comment]);


    const addReview = () => {
        const process = async () => {
            try {
                let { data } = await authApi().post(endpoints['addcomment'], {
                    "comment": content,
                    "productId": product.id,
                });
                setContent([data, ...content]);
                setContent('');
            }
            catch (ex) {
                console.error(ex)
            }
        }
        process();
    }

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


    if (product === null)
        return <Myspinner />

    let direct = `/dang-nhap-nguoi-dung?next=/san-pham/${product.id}`
    return (
        <>
            <div className={clsx(module.wrap)}>
                <div className="row justify-content-around mt-5 user-info">
                    <div className="col-12 col-md-3">
                        <Image className={module.img} src={product.image}
                            alt={product.name} />
                    </div>
                    <div className="col-12 col-md-5">
                        <h4 ><b>Thông Tin Sản Phẩm</b></h4>
                        <p style={{ fontSize: '25px' }}>{product.name}</p>

                        <p style={{ fontSize: '25px' }}>{product.description}</p>

                        <p style={{ fontSize: '25px' }}>{formatter(product.price)}</p>

                        <Button variant="info" onClick={() => order(product)} className={clsx(module.button)}>Thêm Sản Phẩm <i style={{ marginTop: '5px', marginLeft: '3px' }} class='fas fa-cart-plus' > </i></Button>
                    </div>
                </div>

                <div className={module.cm}>

                    <hr />
                    {user === null ? <p>Bạn phải <Link to={direct}>đăng nhập</Link> để  có thể bình luận sản phẩm !!!</p> : null}

                    <Form.Control as="textarea" value={content} onChange={e => setContent(e.target.value)} rows={3} placeholder="Nội dung bình luận..." required />
                    <p></p>
                    <Button variant="info" style={{ marginLeft: '15px' }} onClick={addReview} className="mt-2 mb-2 ">Bình luận</Button>
                    {comment === null ? <Myspinner /> : <>
                        <ListGroup >
                            {comment.map(c => <ListGroup.Item key={c.reviewId}>
                                {c.userId.username}: {c.comment} - <Moment locale="vi" fromNow >{c.reviewDate}</Moment>
                            </ListGroup.Item>)}
                        </ListGroup>
                    </>}
                </div>
            </div>
        </>
    )
}
export default Comment;
