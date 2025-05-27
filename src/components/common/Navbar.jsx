import React, { useEffect, useState } from 'react';
import logo from '../../assets/Images/single_logo_without_circle.png';
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import ProfileDropdown from '../core/auth/ProfileDropdown';
import { categories } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import { ArrowDown } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const [sublinks, setubLinks] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [catalogOpenMobile, setCatalogOpenMobile] = useState(false);

    const matchRoute = (route) => {
        if (!route) return false;
        return matchPath({ path: route }, location.pathname);
    }


    async function getCatelog() {
        try {
            const response = await apiConnector("GET", categories.CATEGORIES_API);
            setubLinks(response.data.allTags);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCatelog();
    }, []);

    return (
        <div className="border-b border-richblack-700 bg-richblack-900 fixed top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between h-14 px-4 md:px-12 max-w-[1400px] mx-auto">
                {/* Logo */}
                <div className='h-full  ml-3'>
                    <Link to="/">
                        <img src={logo} alt="logo" className='h-full ' loading="lazy" />
                    </Link>
                </div>


                {/* Hamburger menu button - mobile */}
                <button
                    className="md:hidden text-richblack-25 text-2xl"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Nav Links - Desktop */}
                <nav className="hidden md:flex items-center gap-x-6 text-richblack-25 font-medium text-sm">
                    {NavbarLinks.map((link, idx) => (
                        <div key={idx} className="relative group">
                            {link?.title === "Catalog" ? (
                                <>
                                    <div className="flex items-center gap-x-1 cursor-pointer select-none">
                                        <p
                                            className={`text-sm font-medium transition-colors duration-200 ${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"
                                                } group-hover:text-yellow-25`}
                                        >
                                            {link?.title}
                                        </p>
                                        <ArrowDown className="w-4 text-richblack-25 group-hover:text-yellow-25 transition-colors duration-200" />
                                    </div>
                                    {/* Dropdown for desktop */}
                                    <div className="invisible absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-lg bg-white py-3 shadow-lg opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                                        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                                        {sublinks?.length ? (
                                            sublinks.map((sublink, i) => (
                                                <Link
                                                    to={`/catalog/${sublink?.name}`}
                                                    key={i}
                                                    className="block px-5 py-2 text-sm text-richblack-700 hover:bg-richblack-100 hover:text-richblack-900 transition-colors duration-200"
                                                >
                                                    {sublink?.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-5 py-2 text-sm text-richblack-500">No Categories Found</div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <Link to={link?.path}>
                                    <p
                                        className={`text-sm font-medium ${link.path && matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"
                                            } hover:text-yellow-25 transition-colors duration-200`}
                                    >
                                        {link.title}
                                    </p>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Side: Cart + Auth/Profile */}
                <div className="flex items-center gap-x-4">
                    {user && user.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative text-richblack-25 hover:text-yellow-25 transition-colors duration-200 text-xl">
                            <FaShoppingCart />
                            {cartTotalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-25 text-xs font-semibold text-richblack-900">
                                    {cartTotalQuantity}
                                </span>
                            )}
                        </Link>
                    )}

                    {token === null && (
                        <>
                            <Link to="/login">
                                <button className="border border-richblack-700 bg-richblack-800 px-3 py-1 rounded-md text-richblack-100 hover:scale-95 transition-transform duration-200">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="border border-richblack-700 bg-richblack-800 px-3 py-1 rounded-md text-richblack-100 hover:scale-95 transition-transform duration-200">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}

                    {token && <ProfileDropdown />}
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-richblack-900 border-t border-richblack-700">
                    <ul className="flex flex-col gap-y-3 py-4 px-6 text-richblack-25">
                        {NavbarLinks.map((link, idx) => (
                            <li key={idx}>
                                {link.title === "Catalog" ? (
                                    <>
                                        <button
                                            onClick={() => setCatalogOpenMobile(!catalogOpenMobile)}
                                            className="flex items-center justify-between w-full text-left font-medium text-sm hover:text-yellow-25 transition-colors duration-200"
                                        >
                                            {link.title}
                                            <ArrowDown
                                                className={`w-4 transition-transform duration-300 ${catalogOpenMobile ? "rotate-180" : "rotate-0"
                                                    }`}
                                            />
                                        </button>
                                        {catalogOpenMobile && (
                                            <div className="mt-2 ml-4 flex flex-col gap-y-2">
                                                {sublinks.length ? (
                                                    sublinks.map((sublink, i) => (
                                                        <Link
                                                            to={`/catalog/${sublink.name}`}
                                                            key={i}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="text-sm text-richblack-400 hover:text-yellow-25 transition-colors duration-200"
                                                        >
                                                            {sublink.name}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-richblack-500">No Categories Found</p>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={link?.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block text-sm font-medium ${link.path && matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"
                                            } hover:text-yellow-25 transition-colors duration-200`}
                                    >
                                        {link.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                        {/* Auth buttons in mobile */}
                        {token === null && (
                            <>
                                <li>
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full border border-richblack-700 bg-richblack-800 py-2 rounded-md text-richblack-100 hover:scale-95 transition-transform duration-200">
                                            Login
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full border border-richblack-700 bg-richblack-800 py-2 rounded-md text-richblack-100 hover:scale-95 transition-transform duration-200">
                                            Sign Up
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Navbar;
