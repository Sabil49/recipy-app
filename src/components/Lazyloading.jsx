import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

export default function Lazyloading() {
    const [item, setItem] = useState([...Array(20).keys()]);
    const [hasmore, setHasmore] = useState(true);
    
    console.log("item item item item")
    console.log(item)
    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        if (item.length >= 25) {
            setHasmore(false);
            return;
        }
        setTimeout(() => {
            setItem([...item, item.length]);
        }, 1500);
    };

    return (
        <div>
            <h1>demo: react-infinite-scroll-component</h1>
            <hr />
            <InfiniteScroll
                dataLength={item.length}
                next={fetchMoreData}
                hasMore={hasmore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {item.map((i, index) => (
                    <div style={style} key={index}>
                        div - #{index}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}
