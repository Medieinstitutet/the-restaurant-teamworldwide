export const Menu = () => {
    return (
        <div className="menu min-h-full bg-neutral-950">
            <h1 className="text-5xl text-neutral-50 text-center p-14">ON THE MENU</h1>
            <div className="menu-content">
                <figure>
                    <img src="src/assets/urban-gyllstrom-MaWMfm-HCqQ-unsplash.jpg" alt="" />
                    <button>
                        <img src="src/assets/gourmet_plates.svg" alt="" />
                    </button>
                </figure>
                <figure>
                    <img src="src/assets/urban-gyllstrom-MaWMfm-HCqQ-unsplash.jpg" alt="" />
                    <button>
                        <img src="src/assets/craft_brews.svg" alt="" />
                    </button>
                </figure>
                <figure>
                    <img src="src/assets/food-photographer-jennifer-pallian-AZJjIlbZM60-unsplash.jpg" alt="" />
                    <button>
                        <img src="src/assets/desert.svg" alt="" />
                    </button>
                </figure>
            </div>
        </div>
    )
}