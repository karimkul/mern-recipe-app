import { useLoaderData } from "react-router-dom";
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
                                src={`http://localhost:5000/${item.coverImage}`}
                                alt="Delicious food on a plate"
                                width="120px"
                                height="100px"
                            />
                            <div className="card-body">
                                <div className="title">{item.title}</div>
                                <div className="icons">
                                    <div className="timer">
                                        <BsFillStopwatchFill /> {item.time}
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
