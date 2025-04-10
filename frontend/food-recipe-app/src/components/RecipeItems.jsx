import { useLoaderData } from "react-router-dom";
import foodImg from "../assets/foodRecipe.png";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

function RecipeItems() {
    const allRecipes = useLoaderData();
    return (
        <>
            <div className="card-container">
                {allRecipes?.map((item, index) => {
                    return (
                        <div key={index} className="card">
                            <img
                                src={foodImg}
                                alt="Delicious food on a plate"
                                width="120px"
                                height="100px"
                            />
                            <div className="card-body">
                                <div className="title">{item.title}</div>
                                <div className="icons">
                                    <div className="timer">
                                        <BsFillStopwatchFill /> 30mins
                                    </div>
                                    <FaHeart />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default RecipeItems;
