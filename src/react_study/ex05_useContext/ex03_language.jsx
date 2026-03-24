import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext()

export default function LangComp() {
  const [lang, setLang] = useState("ko"); 
  const value = { lang: lang, setLang: setLang }; // Provider로 전달할 값 객체 생성

  return (
    // TODO: Provider 내부에 <Header />, <Main />, <Button />를 렌더링하세요.
    // TODO: Provider로 lang, setLang을 공유하세요
    <LanguageContext.Provider value={value}>
      <div>
        <Header />
        <Main />
        <Button />
      </div>
    </LanguageContext.Provider>
  );
}

function Header() {
  const value = useContext(LanguageContext);
  // TODO: lang이 'ko'면 "내 웹사이트", 아니면 "My Website"를 렌더링하세요.
  return (
    <h1>{value.lang === 'ko' ? "내 웹사이트" : "My Website"}</h1>
  )
}

function Main() {
  const value = useContext(LanguageContext);
  return (
    <p>{value.lang === 'ko' ? "안녕하세요" : "Hello"}</p>
  )
  // TODO:  lang이 'ko'면 "안녕하세요", 아니면 "Hello"를 렌더링하세요.

}

function Button() {
  // TODO: - lang이 'ko'면 버튼 라벨 "언어 변경", 아니면 "Change language"
  //       - toggleLanguage를 구현하세요. (힌트: setLang을 가져와서 쓰세요)
  const value = useContext(LanguageContext);
  const lang = value.lang;
  const setLang = value.setLang;
  const toggleLanguage = () => {
    setLang(prevLang => prevLang === 'ko' ? 'en' : 'ko');
  }
  return (
    <button 
      onClick={toggleLanguage}
    >{lang==="ko" ? "언어 변경" : "Change language" }
    </button>
  )
}