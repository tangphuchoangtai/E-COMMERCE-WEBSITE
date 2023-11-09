import { memo, useContext, useState } from "react";
import "./style.scss";
import { AiOutlineGlobal, AiOutlineUser, AiOutlineForm, AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatter } from "utils/formater";
import { ROUNTERS } from "utils/router";
import { Badge, Button } from "react-bootstrap";
import { MyCartContext, MyUserContext } from "../../../../router";
import Apis, { endpoints } from "configs/Apis";
import MySpinner from "../MySpinner"


const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [cartCounter,] = useContext(MyCartContext);
    const [categories, setCategories] = useState(null);

    // const loadCates = async () => {
    //     let res = await Apis.get(endpoints['categories'])
    //     setCategories(res.data);
    // }
    // useEffect(() => {
    //     loadCates();
    // }, [])

    // const search = (evt) => {
    //     evt.preventDefault();
    //     nav(`/?kw=${kw}`)
    // }

    // const logout = () => {
    //     dispatch({
    //         "type": "logout"
    //     })
    // }

    // if (categories === null)
    //     return <MySpinner />;

    const [menus] = useState([
        {
            name: "Trang chủ",
            path: ROUNTERS.USER.HOME,
        },
        {
            name: "Sản phẩm",
            path: ROUNTERS.USER.PRODUCTS,
            // child: [
            //     {
            //         name: "Áo",
            //         path: "",
            //     },
            //     {
            //         name: "Quần",
            //         path: "",
            //     },
            //     {
            //         name: "Giày",
            //         path: "",
            //     }
            // ]
        },

        {
            name: "Đăng ký",
            path: ROUNTERS.USER.REGISTER,
        },
    ]);

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    return (
        <>
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header_top_left">
                            <ul>
                                <li>
                                    <span>Trường Đại học Mở TP.HCM </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 header_top_right" >
                            <ul>

                                {user === null ? <>
                                    <Link style={{ color: 'black' }} className="nav-link " to="/dang-nhap-nguoi-dung">
                                        <h2>Đăng nhập</h2>
                                    </Link>
                                </> : <>
                                    <Link style={{ color: 'black', 'text-decoration': 'none', cursor: 'default' }} to="/"> Hi  {user.username}</Link>
                                    <Button variant="info" onClick={logout}>Đăng xuất</Button>
                                </>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xl-3 ">
                        <div className="header_logo">
                            <h1>HTSHOP</h1>
                        </div>
                    </div>

                    <div className="col-xl-6 ">

                        <nav className="header_menu">
                            <ul>
                                {
                                    menus?.map((menu, menuKey) => (
                                        <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                            <Link to={menu?.path}>
                                                {menu?.name}
                                            </Link>

                                            {
                                                menu.child && (
                                                    <ul className="header_sub_menu">
                                                        {
                                                            menu.child.map((childItem, childKey) => (
                                                                <li key={`${menuKey}-${childKey}`}>
                                                                    <Link to={childItem.path}>{childItem.name}</Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>

                    </div>
                    <div className="col-xl-3 ">
                        <div className="header_cart">
                            {/* <div className="header_cart_price">
                                <span>{formatter(1002132)}</span>
                            </div> */}
                            <ul>
                                <Link className="nav-link text-danger" to="/gio-hang"> &#128180;
                                    <Badge bg="danger">
                                        {cartCounter}
                                    </Badge>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default memo(Header);