// src/components/Layout.jsx
import Header from './common/Header';
import Footer from './common/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;