import React, { ReactNode } from 'react';
import '../css/bootstrap.min.css';
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="container">
                { children }
            </div>
        </div>
    )
}

export default Layout;