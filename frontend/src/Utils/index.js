import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa";
import sofaImg from "../assets/images/Sofa.png";
import tvImg from "../assets/images/TV.png";
import kidsClothesImg from "../assets/images/KidsClothes.png";


export const banner = [
    {
        id: 1,
        image: sofaImg,
        title: "Home Comfort",
        subtitle: "Living Room",
        description: "Upgrade your space with cozy and stylish sofas",
    },
    {
        id: 2,
        image: tvImg,
        title: "Entertainment Hub",
        subtitle: "Smart TV",
        description: "Experience the latest in home entertainment",
    },
    {
        id: 3,
        image: kidsClothesImg,
        title: "Playful Picks",
        subtitle: "Kids' Clothing",
        description: "Bright and fun styles for kids, up to 20% off",
    }
];

export const adminNavigation = [
    { name: "DashBoard", href: "/admin", icon: FaHome },
    { name: "Orders", href: "/admin/orders", icon: FaShoppingCart },
    { name: "Products", href: "/admin/products", icon: FaBoxOpen },
    { name: "Categories", href: "/admin/categories", icon: FaThList },
    { name: "Sellers", href: "/admin/sellers", icon: FaStore },
];

export const sellerNavigation = [
    { name: "Orders", href: "/admin/orders", icon: FaShoppingCart },
    { name: "Products", href: "/admin/products", icon: FaBoxOpen },
];

