function Book({title, author, year}){
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent:"center"
        }}>
            <span>제목:{title}, 저자:{author}, 출판연도:{year}</span>
        </div>
    )
}

const books = [
    {id:1, title:"해리포터", author:"J.K.롤링", year:1997},
    {id:2, title:"어린왕자", author:"생텍쥐페리", year:1943}
];

export default function BookList(){
    return(
        <div>
            {books.map(book => (
                <Book
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    year={book.year}
                />
            ))}
        </div>
    )
}