import { memo, useRef, useState } from "react";
import "./style.scss";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "configs/Apis";
import MySpinner from "utils/formater";

const RegisterPage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPass: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const avatar = useRef();
  let nav = useNavigate();

  const change = (evt, field) => {
    setUser((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  const register = (evt) => {
    evt.preventDefault();

    const process = async () => {
      let formData = new FormData();

      for (let field in user)
        if (field !== "confirmPass") formData.append(field, user[field]);

      formData.append("avatar", avatar.current.files[0]);

      setLoading(true);
      let res = await Apis.post(endpoints["register"], formData);

      if (res.status === 201) {
        nav("/login");
      }
    };

    if (user.password !== user.confirmPass) {
      // ...
    } else {
      process();
    }
  };

  return (
    <>
      <h1 className="title">ĐĂNG KÝ NGƯỜI DÙNG</h1>
      <div className="form-regis">
        <Form onSubmit={register}>
          <Form.Group className="mb-3  1" >
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên"
              onChange={(e) => change(e, "firstName")}
              value={user.firstName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên lót</Form.Label>
            <Form.Control
              type="text"
              placeholder="Họ và tên lót"
              value={user.lastName}
              onChange={(e) => change(e, "lastName")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => change(e, "email")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Điện thoại</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Điện thoại"
              value={user.phone}
              onChange={(e) => change(e, "phone")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              value={user.username}
              onChange={(e) => change(e, "username")}
              placeholder="Tên đăng nhập"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={user.password}
              onChange={(e) => change(e, "password")}
              placeholder="Mật khẩu"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={user.confirmPass}
              onChange={(e) => change(e, "confirmPass")}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ảnh đại diện</Form.Label>
            <Form.Control type="file" ref={avatar} />
          </Form.Group>
          <Form.Group className="mb-3">
            {loading === true ? (
              <MySpinner />
            ) : (
              <Button type="submit" variant="danger">
                Đăng ký
              </Button>
            )}
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default memo(RegisterPage);
