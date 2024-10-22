
    import { useState, useEffect } from "react"

    export function WeatherIdeas(props) {
        const [idea, setIdea] = useState('')
    
        useEffect(() => {
            if (props.temp >= 15) {
                if (props.description === 'CLEAR SKY') {
                    setIdea("The weather is perfect for an outdoor workout!")
                } else if (props.description === 'FEW CLOUDS' || props.description === 'SCATTERED CLOUDS') {
                    setIdea("The weather is not the best, but it's still nice for some outdoor exercise.")
                } else if (props.description === 'BROKEN CLOUDS') {
                    setIdea("It looks like it might rain soon. Outdoor workout could be a risk – your call!")
                } else {
                    setIdea("It's not cold, but with this weather... better stay indoors.")
                }
            } else {
                if (props.description === 'CLEAR SKY') {
                    setIdea("It's a bit chilly, but the sunshine makes it a good time for an outdoor workout to warm up!")
                } else if (props.description === 'FEW CLOUDS' || props.description === 'SCATTERED CLOUDS') {
                    setIdea("It's cold outside, but at least it's not raining. Outdoor exercise could work if you're up for it.")
                } else if (props.description === 'BROKEN CLOUDS') {
                    setIdea("Cold and probably raining soon – outdoor workout might be risky. Your choice!")
                } else {
                    setIdea("It's cold, and with this weather... staying indoors is a better option.")
                }
            }
        }, [props.temp, props.description])


    return (
        <>
        {idea}</>
    )
}
