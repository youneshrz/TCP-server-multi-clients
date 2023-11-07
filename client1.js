var readlineSync = require('readline-sync');
const net = require('net');
//Configuration ===================================
const port = 8080;
const val=[]
const g=3
const p=17
const priv=15
const pub=(g**priv)%p
let x=null
const client1 = new net.Socket();
//Connect to the server on the configured port 
client1.connect(port, async ()=>{
   async function print(){  console.log(`Cleint 1 :Connected to server on port ${port}`)}
   await print();

         client1.write(pub.toString());   
});

//Handle data coming from the server
client1.on('data', async function(data){
   if (data.toString()=='2') x=2
   if (data.toString()=='3') x=3
   if (data.toString()=='4') x=4
   if(x==null){
   val.push(data.toString())
   sec=(val[0]**priv)%p
   console.log(`Public key from server : ${val}`)
   console.log('key changed successful. !');
   console.log(`your secret key is: ${sec} `)
   var m = readlineSync.question('Enter yor massage for Encryption!...  '); 
   let chapiter=2   
   client1.write(chapiter.toString())
   client1.write(m)
   }else if(x==2){
      if(data.toString()=='2'){
      }else{
      console.log(`massage cipher is : ${data.toString()}`)
      var d = readlineSync.question('Enter yor massage for Decryption!...  '); 
       let chapiter=3 
      client1.write(chapiter.toString())
      client1.write(d)
      }
      }else if(x==3){
         if(data.toString()=='3'){
         }else{
         console.log(`massage  is : ${data.toString()}`)
         var b = readlineSync.question('Enter yor massage for converting to binnary ! ...'); 
         let chapiter=4
         client1.write(chapiter.toString())
         client1.write(b)
         }
      }else if(x==4){
         if(data.toString()=='110100' || data.toString()=='4'){
         }else{
         console.log(`nomber of 1 in this  massage is : ${data.toString()}`)
          }
         }
});

client1.on('close',function(){
   console.log('Cleint 1 :Connection Closed');
});

client1.on('error',function(error){
   console.error(`Connection Error ${error}`); 
});
