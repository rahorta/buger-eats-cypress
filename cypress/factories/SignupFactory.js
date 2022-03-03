var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function () {
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            // name: firstName + ' ' + lastName,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '32999991111',
            address: {
                postalcode: '36010080',
                street: 'Rua Barão de São João Nepomuceno',
                number: '132',
                details: 'Apto 102',
                district: 'Centro',
                city_state: 'Juiz de Fora/MG'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}