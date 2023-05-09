import { faker } from "@faker-js/faker";

export const generateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(5),
        price: faker.commerce.price(100,200),
        status:faker.datatype.boolean(),
        stock: faker.random.numeric(),
        category: faker.commerce.department(),
        image: faker.image.avatar(),
        }
        return product 
}


