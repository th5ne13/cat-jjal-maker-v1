const Maincard = ({ img, onHeartClick, isFavoriteClicked }) => {
    const heartIcon = isFavoriteClicked ? "đ" : "đ¤";
    return (
        <div className="main-card">
            <img src={img} alt="ęł ěě´" width="400" />
            <button onClick={onHeartClick} >{heartIcon}</button>
        </div>
    )
}

export default Maincard;