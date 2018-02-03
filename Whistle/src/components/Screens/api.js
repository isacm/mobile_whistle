var api = {
    getGames() {
        var url = `http://localhost:3000/api/Games`;
        return fetch(url).then((res) => res.json()); 
    },
    getLeagues(id) {
        var url = `http://localhost:3000/api/Leagues/` + id;
        return fetch(url).then((res) => res.json());
    },
    getReferee() {
        var url = `http://localhost:3000/api/Referees/`;
        return fetch(url).then((res) => res.json());
    },
    getTeam(id) {
        var url = `http://localhost:3000/api/Teams/` + id;
        return fetch(url).then((res) => res.json());
    },
    getDesignations() {
        var url = `http://localhost:3000/api/Designations/`;
        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;