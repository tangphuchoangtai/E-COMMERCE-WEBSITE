import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/users/homePage";
import { ROUNTERS } from "./utils/router";
import cookie from "react-cookies";
import MasterLayout from "./pages/users/theme/masterLayout";
import ProfilePage from "./pages/users/profilePage";
import ProductPage from "./pages/users/productPage";
import RegisterPage from "./pages/users/registerPage";
import CartPage from "./pages/users/cartPage";
import { createContext, useReducer } from "react";
import MyUserReducer from './reducer/MyUserReducer';
import MyCartCounterReducer from './reducer/MyCartCounterReducer';
import Comment from"./pages/CommentPage/CommentPage"

export const MyUserContext = createContext();
export const MyCartContext = createContext();

const RenderUserRounter = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
    const [cartCounter, cartdispatch] = useReducer(MyCartCounterReducer, 0);

    const userRounters = [
        {
            path: ROUNTERS.USER.HOME,
            component: <HomePage />
        },
        {
            path: ROUNTERS.USER.PRODUCTS,
            component: <ProductPage />
        },
        {
            path: ROUNTERS.USER.PROFILE,
            component: <ProfilePage />
        },
        {
            path: ROUNTERS.USER.REGISTER,
            component: <RegisterPage />
        },
        {
            path: ROUNTERS.USER.CARTPAGE,
            component: <CartPage />
        },
        {
            path: ROUNTERS.USER.COMMENT,
            component: <Comment/>
        },
    ]

    return (
        <MyUserContext.Provider value={[user, dispatch]}>
            <MyCartContext.Provider value={[cartCounter, cartdispatch]}>
                <MasterLayout>
                    <Routes>
                        {userRounters.map((item, key) => (
                            <Route key={key} path={item.path} element={item.component} />

                        ))}
                    </Routes>
                </MasterLayout>
            </MyCartContext.Provider>
        </MyUserContext.Provider>
    );
};

const RouterCustome = () => {
    return RenderUserRounter();
};

export default RouterCustome;
