// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddFoodRecipe() {
//     const [recipeData, setRecipeData] = useState({
//         title: "",
//         time: "",
//         ingredients: "",
//         instructions: "",
//         file: null
//     });

//     const navigate = useNavigate();

//     const onHandleChange = (e) => {
//         const { name, value, type, files } = e.target;
//         setRecipeData((prev) => ({
//             ...prev,
//             [name]: type === "file" ? files[0] : value
//         }));
//     };

//     const onHandleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("title", recipeData.title);
//         formData.append("time", recipeData.time);
//         formData.append("ingredients", recipeData.ingredients);
//         formData.append("instructions", recipeData.instructions);
//         formData.append("coverImage", recipeData.file);

//         const token = localStorage.getItem("token"); // Get token from localStorage

//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/api/recipe",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         Authorization: `Bearer ${token}` // Add token to the header
//                     }
//                 }
//             );
//             // You can add any additional handling for successful submission here
//             navigate("/"); // Redirect after successful submission
//         } catch (error) {
//             console.error(
//                 "Error adding recipe:",
//                 error.response?.data || error.message
//             );
//         }
//     };

//     return (
//         <div className="container">
//             <form className="form" onSubmit={onHandleSubmit}>
//                 <div className="form-control">
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         className="input"
//                         name="title"
//                         value={recipeData.title}
//                         onChange={onHandleChange}
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label>Time</label>
//                     <input
//                         type="text"
//                         className="input"
//                         name="time"
//                         value={recipeData.time}
//                         onChange={onHandleChange}
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label>Ingredients (comma separated)</label>
//                     <textarea
//                         className="input-textarea"
//                         name="ingredients"
//                         value={recipeData.ingredients}
//                         rows="5"
//                         onChange={onHandleChange}
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label>Instructions</label>
//                     <textarea
//                         className="input-textarea"
//                         name="instructions"
//                         value={recipeData.instructions}
//                         rows="5"
//                         onChange={onHandleChange}
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label>Recipe Image</label>
//                     <input
//                         type="file"
//                         className="input"
//                         name="file"
//                         onChange={onHandleChange}
//                     />
//                 </div>
//                 <button type="submit">Add Recipe</button>
//             </form>
//         </div>
//     );
// }

// export default AddFoodRecipe;

// ✅ Updated AddFoodRecipe to require authentication (token-based)
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: "",
        time: "",
        ingredients: "",
        instructions: "",
        file: null
    });

    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value, type, files } = e.target;
        setRecipeData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("time", recipeData.time);
        formData.append("ingredients", recipeData.ingredients);
        formData.append("instructions", recipeData.instructions);
        formData.append("coverImage", recipeData.file);

        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/recipe",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate("/");
        } catch (error) {
            console.error(
                "Error adding recipe:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={onHandleSubmit}>
                <div className="form-control">
                    <label>Title</label>
                    <input
                        type="text"
                        className="input"
                        name="title"
                        value={recipeData.title}
                        onChange={onHandleChange}
                    />
                </div>
                <div className="form-control">
                    <label>Time</label>
                    <input
                        type="text"
                        className="input"
                        name="time"
                        value={recipeData.time}
                        onChange={onHandleChange}
                    />
                </div>
                <div className="form-control">
                    <label>Ingredients (comma separated)</label>
                    <textarea
                        className="input-textarea"
                        name="ingredients"
                        value={recipeData.ingredients}
                        rows="5"
                        onChange={onHandleChange}
                    />
                </div>
                <div className="form-control">
                    <label>Instructions</label>
                    <textarea
                        className="input-textarea"
                        name="instructions"
                        value={recipeData.instructions}
                        rows="5"
                        onChange={onHandleChange}
                    />
                </div>
                <div className="form-control">
                    <label>Recipe Image</label>
                    <input
                        type="file"
                        className="input"
                        name="file"
                        onChange={onHandleChange}
                    />
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default AddFoodRecipe;
