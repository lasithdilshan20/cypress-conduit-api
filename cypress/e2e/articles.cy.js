const email = Cypress.env('email')
const pass = Cypress.env('pass')
const api_server = Cypress.env('api_server')
import { faker} from '@faker-js/faker';
describe('Cet all articles',()=>{
    it('verify list of the articles',()=>{
            cy.api({
                method:'GET',
                url:`${api_server}/articles?limit=10&offset=0`,
                headers:{
                    Authorization: 'Token '+Cypress.env('token')
                }
            }).then((response)=>{
                expect(response.status).eq(200)
            })
    })
})

describe('Create new article, verify , edit, delete E2E API',()=>{

    const title = faker.lorem.words(1);
    const description = faker.lorem.sentences(1)
    const articleInfo = faker.lorem.sentences(3)
    it('Create new article',()=>{
        cy.api({
            method: "POST",
            url: `${api_server}/articles`,
            headers:{
                Authorization: 'Token '+Cypress.env('token')
            },
            body:{
                "article": {
                    "title": title,
                    "description": description,
                    "body": articleInfo,
                    "tagList": [
                        'fashion', 'art', 'music'
                    ]
                }
            }
        }).then((response)=>{
            expect(response.status).eq(201)
            expect(response.body.article.slug).include(title+'-2980')
        })

    })
})