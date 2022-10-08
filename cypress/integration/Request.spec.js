/// <reference types ="Cypress" />
describe('Probando diferentes request',()=>{
    it('Probando POST',()=>{
        cy.request({
            url:"empleados",
            method:"POST",
            body:{
                nombres:"Donna",
                apellidos:"Grisales",
                telefono:"58241478",
                email:"elperro@gmail.com"
            }
        }).then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property("id")
            const id=response.body.id
            cy.wrap(id).as("id")
       
        })
     
    })
    it('Validar registro agregado anteriormente',()=>{
        cy.request('GET',"empleados").then((response)=>{
            expect(response.body[response.body.length-1].nombres).to.eq("Donna")
        })
    })
    it('Actualizar datos del registro procesado',function(){
        cy.request({
            url:`empleados/${this.id}`,
            method:"PUT",
            body:{
                nombres:"Donnita amparo",
                apellidos:"Grisales",
                telefono:"58241478",
                email:"elperro@gmail.com"

            }
        }).then((response=>{
            cy.log(response);
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("id")
        }))
    })
    it('Eliminar registro previamente registrado',function(){
        cy.request({
            url:`empleados/${this.id}`,
            method:"DELETE"
        }).then((response=>{
            expect(response.status).to.eq(200)
        }))
    })
})