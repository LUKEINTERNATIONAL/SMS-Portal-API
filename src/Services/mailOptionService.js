function getHTML(messageObj, recipient) {
    try {
        let td_style = "border: 1px solid #dddddd; text-align: left; padding: 8px;"
        let body_trs = ''
        let row_counter = 1
        let date = ''

        messageObj.forEach(dataObj => {
            date = dataObj.date
            if (dataObj.cases != undefined) {
              let facility_name = dataObj.facility_name
              if(row_counter % 2 == 0) {
                body_trs += `<tr style= "background-color: lightgrey;">`
              } else {
                body_trs += `<tr>`
              }
              body_trs += `<td style = "${td_style}">${facility_name}</td>`
              let cases =JSON.parse(dataObj.cases)
              let counter = 0
              cases.forEach(case_ => {
                row_counter+=1
                let total_count = parseInt(case_.less_five_years) + parseInt(case_.greater_equal_five_years)
                if (counter > 0) {
                  if(row_counter % 2 == 0) {
                    body_trs += `<tr>`
                  } else {
                    body_trs += `<tr style= "background-color: lightgrey;">`
                  }
                  body_trs += `<td style = "${td_style};"></td>`
                }
                body_trs += `<td style = "${td_style}">${case_.condition_name}</td>`
                body_trs += `<td style = "${td_style}">${total_count}</td>`
                body_trs += `</tr>`
                counter++
              })
            }
        })

        //content table
        let notificatonsTable = `<table style="font-family: arial, sans-serif;border-collapse: collapse;width: 100%;">
                                    <tr>
                                    <th style = "border: 1px solid #dddddd; text-align: left; padding: 8px;">Facility Name</th>
                                    <th style = "border: 1px solid #dddddd; text-align: left; padding: 8px;">Condition Name</th>
                                    <th style = "border: 1px solid #dddddd; text-align: left; padding: 8px;">#Count</th>
                                    </tr>
                                    ${body_trs}
                                </table>`

            //assigining mailoptions
        let mailOptions = {
        from: 'idsrnotification@linmalawi.org',
        to: recipient,
        subject: 'EIDSR Notifiable Disease Conditions',
        html: `<html>
                <body style="margin: 0; padding: 0; box-sizing: border-box; font-family: sans-serif; color: #000000c9">
                <h1>EIDSR Notifiable Disease Conditions | (${date})</h1>
                  <div style="margin-left: 0.5%;">
                  ${notificatonsTable}
                  </div>
                  <footer style="padding: 20px 0;">
                    <div style="margin: 0 auto;">
                      <div style="display: flex; justify-content: center;">
                        <ul style="list-style: none; margin: 0; padding: 0; display: flex; align-items: center;" class="logo-list">
                          <li style="margin-right: 20px;"><img src="cid:mwpng@nodemailer.com" height="50"></li>
                          <li style="margin-right: 20px;"><img src="cid:LIN@nodemailer.com" height="50"></li>
                          <li><img src="cid:egpaf@nodemailer.com" height="50"></li>
                        </ul>
                      </div>
                    </div>
                  </footer>
                </body>
              </html>
              `,
        attachments: [
          {
            filename: 'LIN.png',
            path: 'LIN.png',
            cid: 'LIN@nodemailer.com' //same cid value as in the html img src
          },
          {
            filename: 'mw.png',
            path: 'mw.png',
            cid: 'mwpng@nodemailer.com'
          },
          {
            filename: 'egpaf.png',
            path: 'egpaf.png',
            cid: 'egpaf@nodemailer.com'
          }
  
          ]
      }

      return mailOptions
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getHTML
}