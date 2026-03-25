import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function SearchBox() {
    const [text, setText] = useState("");
    const debouncedSearch = useCallback(
        debounce((value) => {
            console.log("API 요청:", value);
        }, 500), []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);
        debouncedSearch(value);
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="검색..."
            />
        </div>
    );
}