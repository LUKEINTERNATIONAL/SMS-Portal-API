const {Respondent} = require('../models')
const {Message} = require('../models')
const {Case} = require('../models')

let cases
let respondents

async function getConditions() {
    cases = await Case.findAll()
    
    if (cases) { 
        getRespondents()
    }
}

async function getRespondents() {
    respondents = await Respondent.findAll()

    if (respondents) {
        for(let respondent in respondents) {
            const respond_ = respondents[respondent].dataValues

            for(let _case in cases) {
                const case_ = cases[_case].dataValues

                if (respond_.facility_code == case_.facility_code) {
                    SaveMessage(respond_.id, case_.condition_name)
                }
            }
        }
    }
}

async function SaveMessage(respondent_id,messsage_body) {
    const messsage = await Message.create({
        respondent_id: respondent_id,
        body: messsage_body
    })

    if (messsage) {
        console.log("HAHAHAHAH")
    }
}

function displayC() {
    //console.log(cases)

    for(let condition in cases) {
        //console.log("condition: ", cases[condition].dataValues)
    }
}

function displayCc() {
    //console.log(cases)

    for(let respondent in respondents) {
        //console.log("condition: ", respondents[respondent].dataValues)
    }
}

 getConditions()