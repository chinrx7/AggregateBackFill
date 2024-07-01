const { default: axios } = require('axios');
const authen = require('./middlewares/authen');
const { config, aggConfig } = require('./middlewares/config');

let startT = new Date(config.StartTime);
let endT = new Date(config.EndTime);

let token;

Task = async () => {
    token = await authen.getToken();

    const header = { headers: { Authorization: token } }

    aggConfig.forEach(async a => {
        while (startT <= endT) {
            const s = new Date(startT)
            const e = new Date(startT.setMinutes(startT.getMinutes() + config.Step));

            const Treqs = tranFormReq(a.Tags, s, e);

            let result;
            await axios.post(config.APIUrl + 'getplotdata', Treqs, header)
                .then((res => {
                    if(res.data[0] !== null){
                        result = res.data;
                    }
                }))


            const saveReq = tranFormData(result);

            await axios.post(config.APIUrl + 'insertagg', saveReq, header)
                

            startT = new Date(e);
        }
    });
    console.log('Done')
}

tranFormData = (resData) => {
    //console.log(resData)
    let reqData = [];
    resData.forEach(res => {
        //console.log(res.Name);
        const r = { Name: res.Name, Records: [] }
        let i = 1;
        const cnt = Object.keys(res.records).length;
        res.records.forEach(v => {
            //console.log(v)
            if (cnt !== i) {
                r.Records.push(v);
            }
            i = i + 1;
        })
        const cntp = Object.keys(r.Records).length;
        if (cntp > 0) {
            reqData.push(r);
        }
    })

    //console.log(reqData)
    return reqData;
}

tranFormReq = (tCfgs, STime, ETime) => {
    let req = [];

    tCfgs.forEach(t => {
        const r = {
            Name: t, Options: {
                Interval: config.Interval, Time: "", StartTime: STime,
                EndTime: ETime
            }
        }
        req.push(r);
    });

    return req;
}

Task()

// while (startT <= endT) {

//     const s = new Date(startT)
//     const e = new Date(startT.setMinutes(startT.getMinutes() + config.Step));
//     startT = new Date(e);
// }