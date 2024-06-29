import { useState } from 'react'


function Button(props){

    return(
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

function StatisticLine({ text, value }) {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}

function Statistics({feedbacks }) {


    const [good,bad,neutral]=feedbacks

    if( good !==0 || neutral!==0 || bad!==0){
        return (
            <>
                <p>good {good}</p>
                <p>bad {bad}</p>
                <p>neutral {neutral}</p>

                <p>all {good + bad + neutral}</p>
                <p> average {(good + bad + neutral) / 3} </p>
                <p>positive {good / (good + bad + neutral)}</p>
            </>
        )
    }

    return <></>
}


function App() {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const feedbackGiven = good !== 0 || neutral !== 0 || bad !== 0;

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />

            {feedbackGiven ? (
                <>
                    <h1>statistics</h1>
                    <table>
                        <tbody>
                        <StatisticLine text="good" value={good} />
                        <StatisticLine text="neutral" value={neutral} />
                        <StatisticLine text="bad" value={bad} />
                        <StatisticLine text="average" value={(good + bad + neutral) / 3} />
                        <StatisticLine text="positive" value={`${(good / (good + bad + neutral)) * 100} %`} />
                        </tbody>
                    </table>
                </>
            ) : (
                <p>No feedback given</p>
            )}
        </div>
    );
}

export default App
