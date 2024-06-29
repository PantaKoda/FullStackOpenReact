import { useState } from 'react'

function Header({course}){
    return(
        <>
            <header>
                {course.name}
            </header>
        </>
    )
}

function Content({course}){
    return(
        <>
            <ul>
                <li>{course.parts[0].name}, excercises {course.parts[0].exercises}</li>
                <li>{course.parts[1].name}, excercises {course.parts[1].exercises}</li>
                <li>{course.parts[2].name}, excercises {course.parts[2].exercises}</li>

            </ul>
        </>
    )
}

function Total({course}){
    return(
        <>
            <p>Total number of excercises : {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
        </>
    )
}


function App() {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }


  return (
    <>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
    </>
  )
}

export default App
