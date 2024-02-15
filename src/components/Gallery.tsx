/* import bleuHorizon from '../assets/bleuHorizon.png'; */

const Gallery = () => {

    return(
        <>
        <div className="title-container">
            <h1 className="title">Gallery</h1>
            <p className="sub-title">Elegance • Flavor • Tradition - A Caribbean Culinary Journey</p>
        </div>

        <section className="layout">
            
            
    <div>
       <img  src="src\assets\Bleu horizon (1).png" alt="Bleu Horizon" />
        </div>
    <div>
        <img src="src\assets\mads-eneqvist-zqiE16q_Ju0-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\gaana-srinivas-kPTL_GocL3s-unsplash.jpg"/>
        </div>
    <div className="vid-container">
        <video className="gallery-vid" autoPlay loop muted>
        <source src="src\assets\sweet_sour_-_11631 (540p).mp4" type="video/mp4"/>
        </video>
        </div>
    <div>
        <img src="src\assets\mads-eneqvist-wFW38_Wzhm4-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\fabio-alves-_fLgxjACz5k-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\albert-YYZU0Lo1uXE-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\ionela-mat-AKKA80RmL34-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\urban-gyllstrom-MaWMfm-HCqQ-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\food-photographer-jennifer-pallian-AZJjIlbZM60-unsplash.jpg"/>
        </div>
    <div className="vid-container">
    <video className="gallery-vid" autoPlay loop muted>
        <source src="src\assets\cocktail_-_35871 (540p).mp4" type="video/mp4"/>
        </video>
       </div>
    <div>
        <img src="src\assets\jirayu-koontholjinda-gfraywnI42s-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\ben-koorengevel-sDEebfEAJ_k-unsplash.jpg"/>
        </div>
    <div>
        <img src="src\assets\aliona-gumeniuk-GAauSStia3s-unsplash.jpg" alt="dessert" />
        </div>
    </section>
    </>
    )
}

export default Gallery;