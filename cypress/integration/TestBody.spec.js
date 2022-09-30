/// <reference types ="Cypress" />
describe('Probando los difernetes metodos del API',()=>{

    it('Probando metodo GET',()=>{
        cy.request('empleados/1').then(response=>{
            expect(response.status).to.equal(200)
        })
    })
    it('Probando metodo GET para id 1',()=>{
        cy.request('empleados/1').then(response=>{
            expect(response.status).to.equal(200)
            expect(response.body.nombres).to.equal('Jairo')
            expect(response.body.apellidos).to.equal('Bermudez')
            expect(response.body.telefono).to.equal(3118962147)
            expect(response.body.email).to.equal('prueba@gmail.com')
        })
    })
    it('Probando metodo POST',()=>{
        cy.request({
            url:"empleados",
            method:"POST",
            body:{
                nombres:'Enrique Gomez',
                apellidos:'Bermudez',
                telefono:"78965432",
                email:"correo@prueba.com"
            }
            }).then((response)=>{
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property("id")
                const id=response.body.id
                cy.wrap(id).as("id")
            })

        })
        it('Validar el registo del nuevo dato',()=>{
            cy.request('GET',"empleados").then((response)=>{
                expect(response.body[response.body.length-1].nombres).to.be.eq('Enrique Gomez')
            })
        })

        it('Probando metodo DELETE',()=>{
            cy.request({
                url:"empleados/6",
                method:"DELETE"
                
            }).then((response)=>{
                expect(response.status).to.eq(200)
            })
        })
        it('Actualizar un registro previamente agregado PUT',()=>{

            cy.request({
                url:"empleados/5",
                method:"PUT",
                body:{
                    nombres:"Juana Martina",
                    apellidos: "Suarez",
                    telefono: 369852147,
                    email: "carlos@prueba.com"
                }

            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).to.have.to.property('id')

            })
        })
    })
