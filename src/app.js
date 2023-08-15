const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "proj-1" ;
const userCreate = (name , age , email)=>{
    return {
        name : name ,
        age:age,
    }
}
const usersCreate = (lists)=>{
    const list1 = lists.map((list)=>{
        return userCreate(list[0] , list[1])
    })
    return list1
}
const user1 = userCreate("Asmaa" , 39);
const user2 = userCreate("Mohamed", 30 );

const usersAll = usersCreate([["Abdelrahman" , 25],["Eman",20] ,["Abeer",27],["Abdelrahman" , 25],["Osama",27] ,["samer",27],["Ali" , 35],["Mostafa",32] ,["Ahmed",27],["yousef" , 27]])
 mongoClient.connect(connectionUrl , (error , data)=>{
    if(error){
        console.log("you can't create database")
    }
    else{
        console.log("your Database is created");
        const db = data.db(dbName);
        //create user1
        db.collection("users").insertOne(user1 , (error , user)=>{
            if(error){
                console.log("you can't insert user")
            }
            else{
                console.log(user.insertedId)
            }
        })
        // create  user2
        db.collection("users").insertOne(user2 , (error , user)=>{
            if(error){
                console.log("you can't insert user")
            }
            else{
                console.log(user.insertedId)
            }
        })
        //create 10 users
        db.collection("users").insertMany(usersAll , (error , users)=>{
            if(error){
                console.log("you can't insert users")
            }
            else{
                console.log(users.insertedCount)

            }
        })
        // find user age = 27
        setTimeout(()=>{
            db.collection("users").find({age:27}).toArray((error , users2)=>{
                if(error){
                    console.log("you can't make find ")
                }
                else{
                    console.log("All users that their age = 27 are:",users2)
                }
            });
    
        },2000)
        // find first 3 user age = 27
        setTimeout(()=>{
            db.collection("users").find({age:27}).limit(3).toArray((error , users2)=>{
                if(error){
                    console.log("you can't make find ")
                }
                else{
                    console.log("the first 3 users that age = 27 year : " , users2)
                }
            })
        },3000)
        // update first 4 user name
        setTimeout(()=>{
            db.collection("users").find({}).limit(4).toArray((error , users2)=>{
                if(error){
                    console.log("you can't make find ")
                }
                else{
                    const user4 = users2
                    const idFourth = user4.map((u)=>{
                        return u._id
                    })
                    idFourth.forEach((li , index)=>{
                        db.collection("users").updateOne({_id:li},{$set:{name:"Mohamed Ali"}})
                        .then((data1)=>{console.log("change name no " , ++index , "is modifies")})
                        .catch((error)=>{console.log(error)})
                    })
                }
            })
        },4000)
        // update first 4 user age=27 add 4 to become 31
        setTimeout(()=>{
            db.collection("users").find({age:27}).limit(4).toArray((error , users2)=>{
                if(error){
                    console.log("you can't make find ")
                }
                else{
                    const user4 = users2
                    const idFourth = user4.map((u)=>{
                        return u._id
                    })
                    idFourth.forEach((li , index)=>{
                        db.collection("users").updateOne({_id:li},{$inc:{age:4}})
                        .then((data1)=>{console.log( "added 4 year no" , ++index ,"is modified")})
                        .catch((error)=>{console.log(error)})
                    })
                }
            })
        },5000)
        // update all user age add 10 year
        setTimeout(()=>{
            db.collection("users").updateMany({},{$inc:{age:10}})
            .then((data1)=>{console.log(data1.modifiedCount ,"is modified" )})
            .catch((error)=>{console.log(error)})
        },6000)
        

        // delete user age:41
        setTimeout(()=>{
            db.collection("users").deleteMany({age:41})
            .then((data1)=>{console.log(data1.deletedCount , "users is deleted")})
            .catch((error)=>{console.log(error)})
        
        },8000)
        //
        
        

       

    }
})

