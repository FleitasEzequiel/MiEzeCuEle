function cookieHelper(cookies) {
    console.log(cookies)
    const cookie = cookies ? JSON.parse(decodeURIComponent(cookies.split("=")[1]).slice(2,35)) : false;
    return cookie   
}

export default cookieHelper;