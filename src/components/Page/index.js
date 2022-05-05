import './page.css';

import Header from './Header';
import Footer from './Footer';

const Page = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
};

export default Page;
