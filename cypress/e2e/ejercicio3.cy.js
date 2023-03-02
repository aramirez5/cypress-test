class Pet {
    constructor(list = []) {
        this.list = list;
    }

    get sameNamePets() {
        return this.countSameNamePets();
    }

    //Count the pets with the same name
    countSameNamePets() {
        var counts = {}
        for (var i = 0; i < this.list.length; i++) {
            if (counts[this.list[i][1]]) {
                counts[this.list[i][1]] += 1
            } else {
                counts[this.list[i][1]] = 1
            }
        }
        return counts;
    }
}

describe('Exercise 3', () => {

    //Variable to save the new pet list
    var petListWithNewFormat = [ []];
    petListWithNewFormat.length = 0;

    it('Create a user and get the data', () => {
        
        //Create a user
        cy.request('POST', 'https://petstore.swagger.io/v2/user', {
            "id": 12453346,
            "username": "test.alvaro",
            "firstName": "test.alvaro",
            "lastName": "test.alvaro",
            "email": "test.alvaro@test.com",
            "password": "123456",
            "phone": "666666666",
            "userStatus": 0
        })
        //Get the user created
        cy.request('https://petstore.swagger.io/v2/user/test.alvaro')
    })

    it('Find pet by status and list the results by id and name', () => {
        
        //Get the pets sold
        cy.request('https://petstore.swagger.io/v2/pet/findByStatus?status=sold')
            .then(response => {
                for (var i = 0; i < response.body.length; i++) {

                    //Check the pets with name
                    if (response.body[i].name) {

                        //Get the id and name
                        var onePetwithNewFormat = [];
                        var petList = response.body[i];
                        var id = petList.id;
                        var name = petList.name;

                        //Storage the data with new format
                        onePetwithNewFormat.push(id, name);

                        //Show the output in console
                        cy.log(onePetwithNewFormat)

                        //Storage all the data
                        petListWithNewFormat.push(onePetwithNewFormat);
                    }
                }

                //Write the results in a file
                cy.writeFile('pets-sold.txt', petListWithNewFormat)
            })
    })

    it('Find the number of pets with same name', () => {

        //Create a pet
        var pet = new Pet(petListWithNewFormat);

        //Show the output
        cy.log(pet.sameNamePets)

        //Write the results in a file
        cy.writeFile('pets-same-name.txt', pet.sameNamePets)
    })
})