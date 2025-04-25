import { createContext, useEffect, useState } from "react";
import axios from 'axios';
// import { food_list } from '../assets/assets'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCarItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCarItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCarItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCarItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             let itemInfo = food_list.find((product) => product._id === item);
    //             console.log(itemInfo);
    //             totalAmount += itemInfo.price  * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (food_list.length === 0) return totalAmount; // Prevents error if food_list is empty

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) { // Check if itemInfo is found
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };


    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list');
        if (response) {
            setFoodList(response.data.data);
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCarItems(response.data.cartData);
    }

    const setSearchQueryAndResults = (query) => {
        setSearchQuery(query);

        const results = food_list.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
    };
    // Function to clear the search query
    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults(food_list);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const data = localStorage.getItem('token')
            if (data) {
                setToken(data)
                await loadCartData(data);
            }
        }
        loadData();
    }, [])
    const contextValue = {
        food_list,
        cartItems,
        setCarItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchQuery,
        searchResults,
        setSearchQueryAndResults,
        clearSearch
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;