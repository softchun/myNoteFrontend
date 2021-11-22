
function IsLogin() {

    const token = localStorage.getItem('token');

    try {
        if (token) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default IsLogin;