import './category-shop-page.css'
import ItemCard from "../item-card/item-card";
import {useContext, useEffect, useState} from "react";
import {ItemsContext} from "../../context/items/items";

const CategoryShopPage = ({itemsArray}) => {
    const {setItems} = useContext(ItemsContext)
    const sortHelper = (attr, rev) => (x, y) => {
        if(!x)
            return parseFloat(y[attr])
        if(!y)
            return parseFloat(x[attr])
            return rev ? parseFloat(y[attr]) - parseFloat(x[attr]) : parseFloat(x[attr]) - parseFloat(y[attr])
    }

    useEffect(() => {
            setItems(itemsArray)
            setFilteredItems(itemsArray)
    }, [itemsArray])

    const {items} = useContext(ItemsContext)
    const [filteredItems, setFilteredItems] = useState(items)

    const sortHandler = (event) => {
        const selectedField = event.target.value
        if(selectedField === 'price_reversed')
            itemsArray.sort(sortHelper('price', true))
        else
            itemsArray.sort(sortHelper(selectedField, false))
        setItems(itemsArray)
    }

    const searchBarHandler = (event) => {
        const searchText = event.target.value
        setFilteredItems(items.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())))
    }

    return (
        <div className='category-shop-page-container'>
            <div className='sort-options-container'>
                <p>Sort:</p>
                <select defaultValue='select' onChange={sortHandler} name="" id="">
                    <option name='select' value="select">Select.</option>
                    <option name='price' value="price">Price.</option>
                    <option name='price_reversed' value="price_reversed">Price reversed.</option>
                    {/*<option name='ratings' value="starAverage">Ratings.</option>*/}
                    {/*<option name='name' value="name">Alphabet.</option>*/}
                    {/*<option name='rating' value="rating">Rating.</option>*/}
                </select>
                <p>Search:</p>
                <input onChange={searchBarHandler} type="text" placeholder='Name of item.' name='search-bar'/>
            </div>
            <div className='category-items-container'>
                {filteredItems ? filteredItems.map((item, idx) => {
                    return <ItemCard key={item.id} item={item} animationDelay={idx} />
                }) : null}
            </div>
        </div>
    )
}
export default CategoryShopPage