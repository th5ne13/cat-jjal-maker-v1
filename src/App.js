import logo from './logo.svg';
import './App.css';
import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Maincard from "./components/Maincard";
import Favorites from "./components/Favorites";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

// const catItem = (
//   <li>
//     <img src="http://www.ezyeconomy.com/news/photo/202110/113350_58336_614.png" />
//   </li>
// );



// 1. 엘리먼트를 -> 컴포넌트로 옮김
// 2. useState를 부모태그로 옮김(h1도 해당 상태를 사용하기위함)
// 3, form 컴포넌트에서, counter와 setcounter가 없으니 에러가나옴
// 4. 함수자체를 부모태그로 옮겨주며, 함수를 인자로 넘겨줌
const App = () => {
  const CAT1 = "http://www.ezyeconomy.com/news/photo/202110/113350_58336_614.png";
  const CAT2 = "http://dog1004.kr/jb/dup/board/files/photo1/7adb012f77254c5BC5A9B1E2BAAFC8AF5DIMG_1189BFC1+B5CEBBF3.jpg";
  const CAT3 = "https://mblogthumb-phinf.pstatic.net/20160520_137/rlaantjd8204_1463747611363iCXpf_JPEG/%B9%E9%B1%B83.jpg?type=w2";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, makeMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  })

  const isFavoriteClicked = favorites.includes(mainCat);

  async function setInitCat() {
    const response = await fetchCat("first cat");
    makeMainCat(response);
  }

  React.useEffect(() => {
    // 리액트 컴포넌트 안에 있는 코드는, 기본적으로 UI가 새로 업데이트될때마다 불리게 된다
    //useEffect를 사용하여, 우리가 원할때에만 코드가 불리도록 제한이 가능 => 두번째 인자로 배열을 사용해준다
    setInitCat();
  }, [])  // 두번째 인자로 배열을 넘기고, 원하는 상태를 넘겨주면 제한을 할 수 있다. 앱이 생성됬을떄만 호출하고싶으면 빈배열

  // React.useEffect(() => {
  //   console.log("존나어렵네 시발");
  // }, [counter])

  async function updateMainCat(value) {
    const response = await fetchCat(value);
    makeMainCat(response);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites)
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }
  const counterTitle = counter === null ? "" : counter + "번째 ";
  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <Maincard img={mainCat} onHeartClick={handleHeartClick} isFavoriteClicked={isFavoriteClicked} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
