/// <reference types ="Cypress" />
describe("Validando API de Pokemon",function(){

    it("Obteniendo pokemon con id=1",function(){
        cy.request('https://pokeapi.co/api/v2//pokemon-species/1').then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8')
            expect(response.body.color['name']).to.be.equal('green')
            expect(response.body.name).to.be.equal('bulbasaur')

        })
    })
    it("validando un pokemon que no existe",function(){
        cy.request({url:'https://pokeapi.co/api/v2//pokemon-species/85414',failOnStatusCode: false}).then((response)=>{
            expect(response.status).to.equal(404)
            expect(response.body).to.be.equal("Not Found")
        })
    })
})