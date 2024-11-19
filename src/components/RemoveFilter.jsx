export default function RemoveFilter({filterPropsValue,onClickHandler}){
    return(
        <div title="remove" onClick={() => onClickHandler(filterPropsValue)} className="inline-block mt-2 p-[2px] border rounded ml-4 cursor-pointer text-xs relative">
            <div>{filterPropsValue}</div>   
        <div className="top-[-5px] right-[-5px] absolute">x</div>
        </div>
    )
}