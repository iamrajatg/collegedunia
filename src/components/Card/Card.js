import React, { Children } from "react"
import classes from "./Card.module.css"

function Card({ children }) {
    return <div className={classes.Card}>{children}</div>
}
Card.Banner = ({ children, ...restProps }) => {
    return <div className={classes.CardBanner}>{children}</div>
}

Card.Image = (props) => {
    return <img className={classes.CardImage} {...props} />
}

Card.Rating = ({ rating, ratingRemarks }) => {
    return (
        <div className={classes.RatingBox}>
            <p>
                <span className={classes.Rating}>{rating}</span>/5
            </p>
            <p>{ratingRemarks}</p>
        </div>
    )
}

Card.Promoted = () => {
    return (
        <div className={classes.Promoted}>
            <p>PROMOTED</p>
        </div>
    )
}

Card.Tag = ({ tags }) => {
    return (
        <div className={classes.TagContainer}>
            {tags.map((tag, i) => (
                <div key={i} className={classes.Tag}>
                    {tag}
                </div>
            ))}
        </div>
    )
}

Card.Ranking = ({ text }) => {
    return <p className={classes.Ranking}>{`#${text}`}</p>
}

Card.Content = ({ children }) => {
    return <div className={classes.ContentContainer}>{children}</div>
}

Card.Details = ({ name, rating, nearest_place, famous_nearest_places }) => {
    return (
        <div className={classes.details}>
            <p className={classes.name}>{name}</p>
            <p className={classes.nearestPlace}>
                {nearest_place[0]}{" "}
                <span className={classes.nearestPlaceLight}>
                    {nearest_place.slice(1).map((place) => `| ${place}`)}
                </span>
            </p>
            <p className={classes.famousPlacesLight}>
                <span className={classes.greenColor}>93% Match : </span>
                {famous_nearest_places.split(",").map((place, i, arr) => {
                    return (
                        <>
                            <span className={classes.famousPlaces}>
                                {place.substring(0, place.indexOf("from"))}
                            </span>
                            {place.substring(place.indexOf("from"))}
                            {i < arr.length - 1 && (
                                <span className={classes.greenColor}>,</span>
                            )}
                        </>
                    )
                })}
            </p>
        </div>
    )
}

Card.Offer = ({ offertext }) => {
    offertext = offertext.replace(/Rs\s*([0-9,]*)/g, "#$1#")

    return (
        <div className={classes.offer}>
            <p className={classes.offerText}>
                {" "}
                {offertext.split("#").map((text) => {
                    let trimmedText = text.trim()
                    if (
                        trimmedText.charCodeAt(0) >= 48 &&
                        trimmedText.charCodeAt(0) <= 57
                    )
                        return (
                            <>
                                {"Rs"}
                                <span className={classes.greenColor}>{text}</span>
                            </>
                        )
                    return text
                })}
            </p>
        </div>
    )
}

Card.Pricing = ({ discount, original_fees, discounted_fees, fees_cycle, amenities }) => {
    return (
        <div className={classes.pricing}>
            <div className={classes.origPriceCont}>
                <p className={classes.originalFees}>&#8377;{original_fees}</p>
                <div className={classes.tagContainer}>
                    <div className={classes.discountTag}></div>
                    <div className={classes.discountTagBox}>{discount}</div>
                </div>
            </div>
            <p className={classes.discountedFees}>&#8377;{discounted_fees}</p>
            <p className={classes.feesCycle}>{fees_cycle}</p>
            <p className={classes.greenColor}>
                {amenities.map((amenity, i) => {
                    return i < amenities.length - 1 ? amenity + " . " : amenity
                })}
            </p>
        </div>
    )
}
export default Card
