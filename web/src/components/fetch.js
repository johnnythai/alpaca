

const FetchAPI = (url, cookies, e) => {
    const queryString = () => {
        if (e !== null) {
            let formData = new FormData(e.target)
            let query = new URLSearchParams(formData).toString()
            return(query)
        } else if (e === null) {
            let query = ''
            return(query)
        } else {
            alert('400 Bad Request')
        }
    }

    if ('access_token' in cookies.cookies) {
        if (cookies.cookies.access_token !== 'removed') {           
            const fetchOptions = {
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + cookies.cookies.access_token
                }
            }

            const fetchResponse = fetch(url + '?' + queryString(), fetchOptions)
            .then(res => {
                console.log(typeof(res.status))
                if (res.ok === true) {
                    return(res.json())
                } else if (res.status === 401) {
                    console.log('stat', res.status)
                    let err = new Error(' Login credentials have expired. Please log in again.')
                    return(err)
                } else {
                    let err = new Error(' Invalid form submission.')
                    return(err)
                }
            })

            return(fetchResponse)

        } else {
            return(new Error(' Please log in.'))
        } 
    }
}

export default FetchAPI;    