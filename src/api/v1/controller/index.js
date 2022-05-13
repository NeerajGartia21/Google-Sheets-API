const axios  = require('axios');
const getGoogleTokens = require('../../../utils/getGoogleTokens');
const { signToken, getDataFromToken } = require('../../../utils/jwt')

module.exports.googleAuth = async function (req, res) {
    try{
    const tokens=await getGoogleTokens({code:req.query.code});
    return res.status(200).json({
        message: 'login successful',
        data: {
            token: await signToken(req.params.code)
        },
        success: true
    });
}catch(err){
    res.status(err.status).send(err.message);
}
};

module.exports.fetchSheetData = async function (req, res) {
    try {
        let spreadSheetId = req.params.id;
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=${process.env.API_KEY}`;
        console.log(url)
        let data = await axios.get(url,
            {
                headers:
                {
                    "Authorization": `Bearer ${req.token}`,
                    'Accept': 'application/json'
                }
            });
        return res.send({
            message: 'data fetched',
            data: {
                spreadSheetData: data.data
            },
            success: true
        });
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

module.exports.updateData = async function (req, res) {
    try {
        let access_token = req.token;

        let { sheet_id, spreadsheet_id, row_number, column_number, value } = req.body;

        if(!sheet_id & !spreadsheet_id & !row_number &!column_number &!value){
            return res.status(400).send("Invalid request.Please provided the required paraameters.")
        }

        let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/Sheet${sheet_id}!${column_number}${row_number}:${column_number}${row_number}?&key=${process.env.API_KEY}`;

        let config={
            headers:
            {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${access_token}`
            }
        };

        console.log(config);

        await axios({
            method: 'put',
            url: url,
            data: JSON.stringify({
                "values": [
                    [value]
                ]
            }),
            config:config
        });
        return res.status(200).json({
            message: 'updated',
            success: true
        });
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
