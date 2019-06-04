//fake database
let results =[
    obj1 = {
        id:1,
        date: new Date(2019, 2, 31),
        system:"partA"
    },
    obj2 = {
        id:2,
        date: new Date(2019, 2, 29),
        system:"partA"
    },
    obj5 = {
        id:5,
        date: new Date(2019, 3, 2),
        system:"partA"
    },
    obj3 = {
        id:3,
        date: new Date(2019, 2, 29),
        system:"partB"
    },
    obj4 = {
        id:4,
        date: new Date(2019, 2, 31),
        system:"partB"
    },
    
    
    ]
    let currentSystem=[];
    let currentItem;
    let usedResults=[];
    let numberOfRecords = 1;
    let today = new Date();
    let recordList=[[]]
    let uniqueSystems = 0;
    console.log(recordList)
    
    
    $(document).ready (function() {
        //adds new records to fake database
        $("#NewRecordButton").click(function()
        {
            var systemInspected = prompt("Please enter the system you inspected");
    
            if (systemInspected == null || systemInspected == "") {
            
            } else {
                
                systemObject = {
                    id: results.length + 1,
                    date: new Date(),
                    system:  systemInspected
                }
                results.push(systemObject)
            }
        });
    
        //checks which systems are scheduled to be inspected
        $("#CheckButton").click(function() 
        {
            //resets variables every time button is clicked
            currentSystem=[];
            currentItem;
            usedResults=[];
            numberOfRecords = 1;
            uniqueSystems = 0;
            recordList = [[]];
            console.log(recordList)
           //for loop to populate 2d array with records from database
            for(i=0; i<results.length;i++)
            {
                console.log("Number of loops: " + numberOfRecords);
                numberOfRecords++;
                //adds array within array for each unique system
                if(!usedResults.includes(results[i].system))
                {
                    
                    currentItem = results[i].system
                    usedResults.push(results[i].system)
                    console.log("Hit new system")
                    if(recordList[uniqueSystems] !== null &&recordList[uniqueSystems] !== undefined)
                    {
                        recordList[uniqueSystems].push(results[i])
                    }
                    else{
                        recordList.push([])           
                        recordList[uniqueSystems].push(results[i]) 
                    }     
                    uniqueSystems++
                    console.log(recordList)
                }
                //adds records within arrays of specific systems
                else{
                    currentItem = results[i].system
                    for(j=0;j<recordList.length;j++)
                    {
                        try{
                            if (recordList[j][0].system ==  results[i].system)
                            {
                                recordList[j].push(results[i])
                            }
                        }
                        catch{
                            console.log("hit catch")
                        }
                    }
                }
                
            }
            //for each of the arrays within the larger array:
            recordList.forEach(record => {
                
                console.log("checker for " + record[0].system)
    
                //checks to ensure there are 2 or more previous records so thet there is a pattern.
                if(record.length >= 2)
                {
                    var latestRecord={
                        id: 0,
                        date: new Date(0),
                        system:""
                    }
                    var secondLatestRecord ={
                        id: 0,
                        date: new Date(0),
                        system:""
                    }
                    latestRecord.date.setDate(0);
                    secondLatestRecord.date.setDate(0);
                    //gets the latest 2 records for each system
                    for(j=0;j<record.length;j++)
                    {
                        if(record[j].date > latestRecord.date)
                        {
                            
                            secondLatestRecord.id = latestRecord.id
                            secondLatestRecord.date = latestRecord.date
                            secondLatestRecord.system = latestRecord.system
                            latestRecord.id = record[j].id
                            latestRecord.date = record[j].date
                            latestRecord.system = record[j].system
                            
                        }
                        else if(record[j].date > secondLatestRecord.date )
                        {
                            
                            secondLatestRecord.id = record[j].id
                            secondLatestRecord.date = record[j].date
                            secondLatestRecord.system = record[j].system
                            
                        }
                    }
                    console.log("dates")
                    console.log(latestRecord.date)
                    console.log(secondLatestRecord.date)
                    //checks the latest 2 records against the current date to see if the system should be inspected
                    if((latestRecord.date -secondLatestRecord.date )<=(today-latestRecord.date ))
                    {
                         alert(latestRecord.system + " is scheduled for inspection")
                    }      
                }
            });
        });
    });