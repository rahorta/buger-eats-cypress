
class SignupPage {

    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        //PREENCHENDO DADOS 
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        //PREENCHENDO ENDEREÇO
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //VALIDANDO BUSCA DO CEP
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)
        //expressões regulares para encontrar elemento com o CSS SELECTOR
        //cy.get('input[name^="city')  --> atributo name que começa com "city"
        //cy.get('input[name*="city')  --> atributo name que contains "city"
        //cy.get('input[name$="uf')  --> atributo name que termina com "uf"

        //SELECIONANDO MÉTODO ENTREGA
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        //FAZENDO UPLOAD DO ARQUIVO
        //Realizado a instação do pacote de upload do cypress
        // npm install cypress-file-upload --save-dev
        //Realizado o import do pacote no arquivo support/index.js
        //Incluído o arquivo a ser enviado na pasta fixtures
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        // cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;