import React, { useEffect, useState, useContext } from 'react';
import { getBillboardItem } from "../../api"
import PlayerContext from "../Player/context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


function BigBillboard() {

    const [item, setItem] = useState(null)
    const { playerItem, setPlayerItem } = useContext(PlayerContext)

    const fetchBillboardItem = async () => {
        const item = await getBillboardItem()
        return item
    }

    useEffect(() => {

        fetchBillboardItem().then(item => {
            setItem(item)
        })
        return () => setItem(null)

    }, [])

    
    return (
        item && (
        <div className="billboard-content-limits">
            <div className="billboard-base">
                <div className="billboard-image-wrapper">
                    <img src={`${process.env.REACT_APP_IMAGE_BASE}original/${item.backdrop_path}`} alt={"hero"} />

                    <div className="billboard-vignette"></div>
                    <div className="billboard-vignette-bottom"></div>
                    <div className="billboard-maturity-rating"><span>+13</span></div>

                </div>

                <div className="billboard-information">
                    <div className="logo-and-text">

                        <div className="billboard-title">
                            <h3>
                                <div>{item.type == "Movie" ? item.title : item.name} </div>
                            </h3>
                        </div>    

                        <div className="billboard-description">
                            <div className="episode-title-container"></div>
                            <div className="synopsis">{item && item.overview}</div>
                        </div>

                        <div className="billboard-link">
                            <a className="play-link">
                                <button className="hasLabel" onClick={() => {item.type == "Movie" ? setPlayerItem(item) : setPlayerItem({data: item, season_number: item.seasons[0].season_number, episode_number: item.seasons[0].episodes[0].episode_number})} }>
                                    <span className="play-icon"><FontAwesomeIcon icon={faPlay} /></span>
                                    <span>Play</span>
                                </button>
                            </a>

                            <button className="hasLabel play-link-secondary">
                                <span className="play-icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                                <span>Information</span>
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )




    );
}

export default BigBillboard;
