import { useNavigate } from "react-router-dom";
import foodRecipe from "../assets/foodRecipe.png";
import RecipeItems from "../components/RecipeItems";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <section className="home">
                <div className="left">
                    <h1>Food Recipe</h1>
                    <h5>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cupiditate atque ex molestias, laborum, veritatis
                        maiores beatae nostrum, explicabo adipisci inventore
                        laboriosam magni voluptates enim. Unde perferendis nulla
                        obcaecati ipsum earum?
                    </h5>
                    <button onClick={() => navigate("/addRecipe")}>
                        Share your recipe
                    </button>
                </div>
                <div className="right">
                    <img
                        src={foodRecipe}
                        alt="Delicious food on a plate"
                        width="320px"
                        height="300px"
                    />
                </div>
            </section>
            <div className="bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#d4f6e8"
                        fillOpacity="1"
                        d="M0,96L60,90.7C120,85,240,75,360,85.3C480,96,600,128,720,165.3C840,203,960,245,1080,224C1200,203,1320,117,1380,74.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </div>
            <div className="recipe">
                <RecipeItems />
            </div>
        </>
    );
}

export default Home;
