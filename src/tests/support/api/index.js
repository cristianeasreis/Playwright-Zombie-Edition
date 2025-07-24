const { expect } = require('@playwright/test');

export class Api {

    constructor(request) {
        this.request = request;
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        });

        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text());
        this.token = 'Bearer ' + body.token;


    }
    async postMovie(movie) {
        await this.setToken();
        
        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,                
                Accept: 'application/json, text/plain, */*'
            },
            multipart:{
                title: movie.title,
                overview: movie.overView, 
                company_id: '71c4a30b-7c36-4c2a-aa2b-4468e00c64fe',
                release_year: movie.release_year,
                featured: movie.featured,
            }
        });

        expect(response.ok()).toBeTruthy();


    }

}