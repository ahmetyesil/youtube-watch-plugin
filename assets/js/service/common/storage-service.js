class StorageService {
    constructor() {
    }
    /**
     * @param {Session} user The date
     */
    setUserModel(user) {
        localStorage.setItem('user_model', JSON.stringify(user));
        this.setSessionID(user.session_id);
    }

    getUserModel() {
        return localStorage.getItem('user_model');
    }
    /**
     * @param {string} session_id The date
     */
    setSessionID(session_id) {
        localStorage.setItem('session_id',session_id);
    }

    removeSessionID() {
        localStorage.removeItem('session_id');
    }

    getSessionID() {
        return localStorage.getItem('session_id');
    }
}


