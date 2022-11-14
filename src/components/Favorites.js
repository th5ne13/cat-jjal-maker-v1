import React from "react";
function CatItem(props) { // style에 value는 스트링으로넘겨줘야함
    return (
        <li>
            <img src={props.img} style={{ width: '150px' }} />
        </li>
    )
}
function Favorites({ favorites }) {
    if (favorites.length === 0) {
        return (
            <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>
        )
    }

    return (
        <ul className="favorites">
            {favorites.map(cat => <CatItem img={cat} key={cat} />)}
        </ul>
    )
};

export default Favorites;
