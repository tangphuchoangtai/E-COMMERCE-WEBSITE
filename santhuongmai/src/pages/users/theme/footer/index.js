import styleFooter from './Footer.module.css'

const Footer = () => {
    return (
        <>
            <div style={{ display: 'block', bottom: 0 }}>
                <div class={styleFooter.footer}>
                    <div class={styleFooter.section}>
                        <h2 >Contact Us</h2>
                        <ul style={{ textAlign: 'left' }}>
                            <h5>(+84) 038955xxxx</h5>
                            <h5>Click to mail us <a className={styleFooter.icon} href="mailto:tangphuchoangtai@gmail.com" style={{ '--color': '#e5f50c' }}>
                                <i class="fa fa-envelope"></i>
                            </a></h5>
                        </ul>
                    </div>

                    <div class={styleFooter.section}>
                        <h2 className={styleFooter.Text}>Follow Us At</h2>
                        <a className={styleFooter.icon} href="https://www.facebook.com/Hoangtai2303/" style={{ '--color': '#0072b1' }}>
                        <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a className={styleFooter.icon} href="https://www.instagram.com/" style={{ '--color': '#E1306C' }}>
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a className={styleFooter.icon} href="https://www.tiktok.com/" style={{ '--color': '#ff0050' }}>
                            <i class="fa-brands fa-tiktok"></i>
                        </a>
                        <a className={styleFooter.icon} href="https://github.com/" style={{ '--color': '#fff' }}>
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </div>

                    <div class={styleFooter.section}>
                        <h2 className={styleFooter.Text}>Thành viên</h2>
                        <ul style={{ textAlign: 'left' }}>
                            <li> <a className={styleFooter.adots} href="https://github.com/tangphuchoangtai"> 2051012103 - Tăng Phúc Hoàng Tài</a></li>
                        </ul>
                    </div>


                </div>
                <div class={styleFooter.info}>
                    <h4 className={styleFooter.hText}>
                        ShoppingOnline &copy; 2023
                        <a className={styleFooter.aText} href="https://www.facebook.com/Hoangtai2303/"> | Hoang Tai</a></h4>
                </div>
            </div>
        </>

    )
}

export default Footer;