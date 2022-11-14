import React from "react";

const Form = ({ updateMainCat }) => {
    // useState : 변하면서 지켜보고 원할때마다 변경할수 있는 값(상태) 를 칭함 
    // const counter = counterState[0];  // counterState의 그 숫자값이고
    // const setCounter = counterState[1]; // 그것을 조작하는 함수 
    const [value, setValue] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

    function handleInputChange(e) {
        const userValue = e.target.value;
        setErrorMessage("");
        if (includesHangul(userValue)) {
            setErrorMessage("한글은 입력할 수 없습니다");
        }
        setValue(userValue.toUpperCase());
    }

    function handleFormatSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        if (value === '') {
            setErrorMessage("빈 값으로 만들 수 없습니다.")
            return;
        }
        updateMainCat(value);

    }


    return (
        <form onSubmit={handleFormatSubmit}>
            <input type="text" name="name" onChange={handleInputChange} value={value} placeholder="영어 대사를 입력해주세요" />
            <button type="submit">생성</button>
            <p style={{ color: "red" }}>{errorMessage}</p>
        </form>
    )

};

export default Form;