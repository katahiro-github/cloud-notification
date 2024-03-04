const mainJs = require('./main');
const main = async () => {
  const returnMain = await mainJs.main(
    {
      "__ce_headers":{
        "Accept":"application/json, text/plain, */*",
        "Accept-Encoding":"gzip, compress, deflate, br",
        "Authorization":"Bearer xxxxx",
        "Content-Length":"1087",
        "Content-Type":"application/json",
        "Ibm-Notifications-Api-Version":"v2.0.0",
        "User-Agent":"axios/1.6.1",
        "X-Request-Id":"04522fb7-7a0c-4a9d-871a-a2f00d1fc2d6"
      },
      "__ce_method":"POST",
      "__ce_path":"/",
      "account_id":"xxxxx",
      "body":[
        {
          "content-type":"text/html",
          "language":"en",
          "text":"Description:<br />On 28 February 2024 at 11:54 UTC, an issue occurred on the data center Aggregate Router (dar01) and datacenter OSA22 (dar01.osa22). On 28 February 2024 at 13:47 UTC, the device war was removed from production, and the issue was resolved. Some customers in the OSA22 data center may have experienced latency or packet loss disruption.  This incident may have affected Storage Area Network (SAN) connectivity. Customers utilizing SAN may find that their environments went read-only and will need to perform a file system check. Network specialists are working on restoring the service ASAP and to determine whether additional action may be necessary to prevent a recurrence of this issue. We apologize for any issues which this incident may have caused.<br /><br /><br />"
        }
      ],
      "category":"Incident",
      "severity":"Severity 2",
      "sourceID":"159522420",
      "startTime":1709121240,
      "state":"Investigating",
      "title":[
        {
          "language":"en",
          "text":"Routing issue on | dar01.osa22 | "
        }
      ]
    }
  )
  console.log(returnMain);
}

main()