import { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(() => {
        // Initialize from localStorage once
        return !localStorage.getItem("token");
    });

    const checkLogin = () => {
        if (!isLogin) {
            // Logging out
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsLogin(true);
        } else {
            // Open modal for login
            setIsOpen(true);
        }
    };

    return (
        <>
            <header>
                <h2>Food Blog</h2>
                <ul style={{ listStyle: "none" }}>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li onClick={() => isLogin && setIsOpen(true)}>
                        <NavLink to={!isLogin ? "myRecipe" : "/"}>
                            My Recipe
                        </NavLink>
                    </li>
                    <li onClick={() => isLogin && setIsOpen(true)}>
                        <NavLink to={!isLogin ? "favRecipe" : "/"}>
                            Favorites
                        </NavLink>
                    </li>
                    <li onClick={checkLogin}>
                        <p className="login">{isLogin ? "Login" : "Logout"}</p>
                    </li>
                </ul>
            </header>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <InputForm
                        setIsOpen={() => {
                            setIsOpen(false);
                            setIsLogin(false); // user logged in successfully
                        }}
                    />
                </Modal>
            )}
        </>
    );
}

export default Navbar;
