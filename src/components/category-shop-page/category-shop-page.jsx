import './category-shop-page.css'
import ItemCard from "../item-card/item-card";
import {useContext, useEffect, useState} from "react";
import {ItemsContext} from "../../context/items/items";
import Highlight from "../Highlight/highlight.tsx";
import Banner from "../banner/banner.tsx";
import bannerImg1 from '../../utils/imgs-landing-page/parallaxImg.jpg'
import bannerImg2 from '../../utils/imgs-landing-page/parallaxImg2.jpg'
import bannerImg3 from '../../utils/imgs-landing-page/parallaxImg3.jpg'
import bannerImg4 from '../../utils/imgs-landing-page/parallaxImg4.jpg'
import bannerImg5 from '../../utils/imgs-landing-page/parallaxImg5.jpg'
import HighlightedItem from "../highlighted-item/highlighted-item.tsx";

const CategoryShopPage = ({itemsArray, categoryTitle}) => {
    const [bannerImg, setBannerImg] = useState({})
    const {setItems} = useContext(ItemsContext)
    const sortHelper = (attr, rev) => (x, y) => {
        if(!x)
            return parseFloat(y[attr])
        if(!y)
            return parseFloat(x[attr])
            return rev ? parseFloat(y[attr]) - parseFloat(x[attr]) : parseFloat(x[attr]) - parseFloat(y[attr])
    }

    useEffect(() => {
        // console.log(categoryTitle)
        switch (categoryTitle) {
            case 'Hats':
                setBannerImg({img: bannerImg3, pos: 'center'})
                break
            case 'Mens':
                setBannerImg({img: bannerImg5, pos: 'center'})
                break
            case 'Womens':
                setBannerImg({img: bannerImg4, pos: 'top'})
                break
            case 'Jackets':
                setBannerImg({img: bannerImg2, pos: 'center'})
                break
            case 'Sneakers':
                setBannerImg({img: bannerImg1, pos: 'bottom'})
                break
        }
    }, [categoryTitle])

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
        <>
            <Banner img={bannerImg.img} text={categoryTitle} pos={bannerImg.pos} />
            <div className='category-shop-page-container'>
                <Highlight text={categoryTitle} />
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
                {

                    itemsArray? <div className="highlighted-items">
                        <HighlightedItem name={itemsArray[itemsArray.length - 1].name} id={itemsArray[itemsArray.length - 1].id} imageUrl={itemsArray[itemsArray.length - 1].imageUrl} price={itemsArray[itemsArray.length - 1].price} />
                        <HighlightedItem name={itemsArray[itemsArray.length - 2].name} id={itemsArray[itemsArray.length - 2].id} imageUrl={itemsArray[itemsArray.length - 2].imageUrl} price={itemsArray[itemsArray.length - 2].price} />
                        <HighlightedItem name={itemsArray[itemsArray.length - 3].name} id={itemsArray[itemsArray.length - 3].id} imageUrl={itemsArray[itemsArray.length - 3].imageUrl} price={itemsArray[itemsArray.length - 3].price} />
                    </div> : null
                }

                <div className='category-items-container'>
                    {filteredItems ? filteredItems.map((item, idx) => {
                        return <ItemCard key={item.id} item={item} animationDelay={idx} />
                    }) : null}
                </div>
            </div>
        </>

    )
}
export default CategoryShopPage