export const MyComponent = () => {
    return <h2>컴포넌트</h2>
}

export default function MyComponent2() {
    return <h2>컴포넌트</h2>
}

export function Child(props) {
    return <h1 style={props.childStyle}>Hello, {props.name}</h1>
}

export function Child2(props) {
    return <h1 style={props.childStyle}>Hello, {props.name}</h1>
}

const obj = {a: 1, b: 2}