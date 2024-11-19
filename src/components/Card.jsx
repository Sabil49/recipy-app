import Favorite from "@/assets/Favorite";
import FavoriteFilled from "@/assets/FavoriteFilled";

function Card({ recipes, id, favoriteindiv }) {
    return (
        <div title={favoriteindiv === "false" ? "Click to favorite" : "Click to unfavorite"} favoriteindiv={favoriteindiv} id={id} className="text-sm md:text-lg cursor-pointer border relative w-2/5 md:w-1/4 lg:w-1/5 min-h-96 m-2 max-w-sm rounded overflow-hidden p-2 md:p-4 shadow-lg">
            <div className="absolute top-0 right-0">{favoriteindiv == "true" ? <FavoriteFilled id={id} /> : <Favorite  id={id} />}</div>
            <img className="-z-50 relative w-full" src={recipes.image} alt="" />
            <div className="-z-50 relative px-2 md:px-4 py-2 font-bold min-h-8 md:min-h-16">{recipes.name}</div>
            <div className="-z-50 relative px-2 md:px-4 py-0">{recipes.cuisine}</div>
            <div className="-z-50 relative px-2 md:px-4 py-0">{recipes.rating} rating</div>
            <div className="-z-50 relative px-2 md:px-4 py-0">{recipes.cookTimeMinutes}m</div>
            <div className="-z-50 relative px-2 md:px-4 pt-4 pb-2">
                {recipes.tags.map((tag, index) => {
                    return (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #{tag}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
export default Card;
