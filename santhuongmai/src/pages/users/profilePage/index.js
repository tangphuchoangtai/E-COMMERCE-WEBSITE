import { memo, useContext, useState } from "react";
import "./style.scss";
import { Button, Form } from "react-bootstrap";
import cookie from "react-cookies";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { MyUserContext } from "../../../router";
import { Navigate, useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, dispatch] = useContext(MyUserContext);
  const [q] = useSearchParams();

  const login = (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await Apis.post(endpoints['login'], {
          "username": username,
          "password": password,
        });
        cookie.save("token", res.data);
        let { data } = await authApi().get(endpoints['current-user']);
        cookie.save("user", data);
        console.info(data);

        dispatch({
          "type": "login",
          "payload": data
        })
      } catch (err) {
        console.error(err);
      }
    }

    process();
  };

  // khi yêu cầu đăng nhập để thanh toán xog sẽ back về giỏ hàng
  if (user !== null) {
    let next = q.get("next") || "/";

    return <Navigate to={next} />
  }
  return (
    <>
      <h1 className="title">ĐĂNG NHẬP NGƯỜI DÙNG</h1>
      <div className="form">
        <Form onSubmit={login} className="form">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên đăng nhập"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button type="submit" variant="info">
              Đăng nhập
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default memo(ProfilePage);
