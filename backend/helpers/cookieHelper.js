function cookieHelper(cookies) {
    const cookie = cookies ? JSON.parse(decodeURIComponent(cookies.split("=")[1]).slice(2,-7)) : false;
    return cookie   
}

export default cookieHelper;