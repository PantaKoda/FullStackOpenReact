export default function Notifications({message, status}) {

    if (message === '') {
        return null
    }

    return (
        <div className={status}>
            {message}
        </div>
    )
}