import { useContext, useState } from 'react';
import cookie from "react-cookies";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { endpoints, authApi } from "configs/Apis";
import { MyCartContext, MyUserContext } from '../../../router';



const CartPage = () => {
    const [, cartdispatch] = useContext(MyCartContext);
    const [user,] = useContext(MyUserContext);
    const [carts, setCarts] = useState(cookie.load("cart") || null);
    const nav = useNavigate();

    const deleteItem = (item) => {
        let cart = cookie.load("cart") || null;
        if (cart !== null)
            if (item.id in carts) {
                cartdispatch({
                    "type": "dec",
                    "payload": cart[item.id]["quantity"]
                });

                delete cart[item.id];
                cookie.save("cart", cart);
                setCarts(cart);
            }
    }

    const updateItem = () => {
        cookie.save("cart", carts);

        cartdispatch({
            "type": "update",
            "payload": Object.values(carts).reduce((init, current) => init + current["quantity"], 0)
        })
    }

    const pay = () => {
        const process = async () => {
            let res = await authApi().post(endpoints['pay'], carts);
            if (res.status === 200) {
                cookie.remove("cart")
                nav("/san-pham");
                cartdispatch({
                    type: 'update',
                    payload: 0,
                });
                setCarts([])
            };
        };
        process();
    }

    if (carts === null)
        return <Alert variant='info' className='mt2'>Hiện không có sản phẩm nào trong giỏ hàng</Alert>

    return <>
        <h1 className="text-center text-info mt-2">GIỎ HÀNG</h1>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th></th>
                    <th>Tên Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {Object.values(carts).map(c => {
                    

                    return <tr>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.unitPrice} VNĐ</td>
                        <td>
                            <Form.Control min={0} type="number" value={carts[c.id]["quantity"]} onBlur={updateItem}
                                onChange={e => setCarts({ ...carts, [c.id]: { ...carts[c.id], "quantity": parseInt(e.target.value) } })} />
                        </td>
                        <td>
                            <Button variant='danger' onClick={() => deleteItem(c)}>&times;</Button>
                        </td>
                        
                    </tr>

                })}
            </tbody>
        </Table>


        {user === null ? <p>Bạn phải <Link to="/dang-nhap-nguoi-dung?next=/gio-hang">đăng nhập</Link> để thanh toán !!!</p> : <Button variant='info mt-2 mb-2' onClick={pay}>Thanh Toán</Button>}
    </>

}

export default CartPage; 