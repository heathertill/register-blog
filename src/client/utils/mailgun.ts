const email = async (body: any) => {
    await fetch('/mailgun', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
};

export { email }