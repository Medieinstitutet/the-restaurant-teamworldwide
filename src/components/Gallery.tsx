/* import bleuHorizon from '../assets/bleuHorizon.png'; */

import { Button } from "./Button";

const Gallery = () => {

    return(
        <>
        <div className="title-container">
            <h1 className="title">Gallery</h1>
            <p className="sub-title">Elegance • Flavor • Tradition - A Caribbean Culinary Journey</p>
        </div>

        <section className="layout">
            
            
    <div>
       <img  src="../../webp-img/Bleu horizon (1).webp" alt="Bleu Horizon" />
        </div>
    <div>
        <img src="../../webp-img/mads-eneqvist-zqiE16q_Ju0-unsplash.webp"/>
        </div>
    <div>
        <img src="../../webp-img/gaana-srinivas-kPTL_GocL3s-unsplash.webp"/>
        </div>
    <div className="vid-container">
        <video className="gallery-vid" autoPlay loop muted>
        <source src="../../videos/sweet_sour_-_11631 (540p).mp4" type="video/mp4"/>
        </video>
        </div>
    <div>
        <img src="../../webp-img/mads-eneqvist-wFW38_Wzhm4-unsplash.webp"/>
        </div>
    <div>
        <img src="../../webp-img/fabio-alves-_fLgxjACz5k-unsplash (1).webp"/>
        </div>
    <div>
        <img src="../../webp-img/albert-YYZU0Lo1uXE-unsplash.webp"/>
        </div>
    <div>
        <img src="../../webp-img/ionela-mat-AKKA80RmL34-unsplash.webp"/>
        </div>
    <div>
        <img src="../../webp-img/urban-gyllstrom-MaWMfm-HCqQ-unsplash.webp"/>
        </div>
    <div>
        <img src="../../webp-img/food-photographer-jennifer-pallian-AZJjIlbZM60-unsplash.webp"/>
        </div>
    <div className="vid-container">
    <video className="gallery-vid" autoPlay loop muted>
        <source src="../../videos/cocktail_-_35871 (540p).mp4" type="video/mp4"/>
        </video>
       </div>
    <div>
        <img src="../../webp-img/jirayu-koontholjinda-gfraywnI42s-unsplash.webp"/>
        </div>
    <div>
        <img src="../../webp-img/ben-koorengevel-sDEebfEAJ_k-unsplash.webp"/>
        </div>
    <div>
        <img src="../../webp-img/aliona-gumeniuk-GAauSStia3s-unsplash.webp" alt="dessert" />
        </div>
    </section>
    </>
    )
}

export default Gallery;