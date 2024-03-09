export const check_token = () => {
    let token = sessionStorage.getItem("u2mya_wallet_access_token");
    if(token) {
        return token
    } else {
        return ""
    }
}