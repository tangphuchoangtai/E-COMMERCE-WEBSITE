import { memo } from "react";
import Header from "../header";
import Footer from "../footer";

const MasterLayout = ({ children, ...pros }) => {
    return (
    <div {...pros}>
       <Header />
        {children}
        <Footer />
    </div>
    );
};

export default memo(MasterLayout);