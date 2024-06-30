function Part({parts}) {

    return (
        <div>
            {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        </div>
    )
}


function Content({course}) {
    const {id, name, parts} = course

    const nbrExcercises = parts.reduce((sum, part) => (sum + part.exercises), 0)

    return (
        <div>
            <Part parts={parts}/>
            <h3>total of {nbrExcercises} </h3>
        </div>
    )
}


function Header({name}) {

    return (
        <>
            <h1>{name}</h1>
        </>
    )
}

export default function Course({course}) {
    const {id, name, parts} = course
    return (
        <>
            <Header name={name}/>
            <Content course={course}/>
        </>


    )
}