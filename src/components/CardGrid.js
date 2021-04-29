import React, { useState, useEffect, useRef, useCallback } from "react"
import "./CardGrid.css"
import Card from "./Card/Card"
import { collegeData } from "./ColllegeData"

function CardGrid() {
    const [page, setPage] = useState(0)
    const [colleges, setColleges] = useState([])
    const loader = useRef(null)

    const fetchColleges = (page) => {
        //Simulating api call
        setTimeout(() => {
            let newColleges = collegeData.slice((page - 1) * 10, page * 10)
            if (newColleges && newColleges.length > 0) {
                setColleges([...colleges, ...newColleges])
            }
        }, 2000)
    }

    useEffect(async () => {
        await fetchColleges(page)
    }, [page])

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        }
        const observer = new IntersectionObserver(handleObserver, options)
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, [])

    const handleObserver = (entities) => {
        const target = entities[0]
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }

    return (
        <div className="Wrapper">
            <div className="CardGrid">
                {colleges.map((college, i) => {
                    return (
                        <Card>
                            <Card.Banner>
                                <Card.Image src={`./images/${college.image}`} />
                                <Card.Tag tags={college.tags} />
                                <Card.Ranking text={college.ranking} />
                            </Card.Banner>

                            <Card.Rating
                                rating={college.rating}
                                ratingRemarks={college.rating_remarks}
                            />
                            {college.promoted && <Card.Promoted />}
                            <Card.Content>
                                <Card.Details
                                    name={college.college_name}
                                    nearest_place={college.nearest_place}
                                    famous_nearest_places={college.famous_nearest_places}
                                />
                                <Card.Offer offertext={college.offertext} />
                                <Card.Pricing
                                    original_fees={college.original_fees}
                                    discount={college.discount}
                                    discounted_fees={college.discounted_fees}
                                    fees_cycle={college.fees_cycle}
                                    amenities={college.amenties}
                                />
                            </Card.Content>
                        </Card>
                    )
                })}
            </div>
            {colleges.length !== collegeData.length && (
                <div className="loading" ref={loader}>
                    <h2>Loading Colleges...</h2>
                </div>
            )}
        </div>
    )
}

export default CardGrid
