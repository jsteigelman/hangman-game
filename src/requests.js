const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

const getCurrentCountry = async () => {
    const userLocation = await getLocation()
    const userCountry = await getCountry(userLocation.country)
    return userCountry
}

const getCountry = async (countryCode) => {
    const response = await fetch('//restcountries.eu/rest/v2/all')

    if (response.status === 200) {
        const data = await response.json()
        const country = data.find((element) => element.alpha2Code === countryCode)
        return country
    } else {
        throw new Error('Unable to fetch country.')
    }
}

const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=db431075bfbc60')
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error('Unable to fetch IP info.')
    }
}

export { getPuzzle as default }