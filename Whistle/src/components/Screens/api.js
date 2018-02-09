var api = {

    refereeExists(useremail, userpass) {
        return (fetch('http://0.0.0.0:3000/api/Referees/login', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: useremail,
              password: userpass,
            })
        }).then((res) => res.json())
    )},
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
    getDesignationsByRefereeId(id) {
        var url = `http://0.0.0.0:3000/api/Referees/` + id + `/designations`;
        return fetch(url).then((res) => res.json());
    },
    getGameByDesignation(id){
        var url = `http://0.0.0.0:3000/api/Games/` + id;
        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;