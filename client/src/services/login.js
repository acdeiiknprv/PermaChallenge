const appLogin = async (credentials) => {
    try {
        const response = await fetch(`https://dummyjson.com/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
            })
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default appLogin;