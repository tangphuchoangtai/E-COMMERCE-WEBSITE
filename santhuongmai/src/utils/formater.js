import { Spinner } from "react-bootstrap";

export const formatter = (number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency" ,
        currency: "VND",
    }).format(number);
};

const Myspinner = () => {
    return <Spinner animation="grow" variant="info" />;
}

export default Myspinner;