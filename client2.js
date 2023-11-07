var readlineSync = require('readline-sync');
const net = require('net');
//Configuration ===================================
const port = 8080;
const val=[]
 let g
 let p
const priv=15
// let pub=(g**priv)%p
let x=null
const client1 = new net.Socket();
//Connect to the server on the configured port 
client1.connect(port, async ()=>{
   async function print(){  console.log(`Cleint 1 :Connected to server on port ${port}`)}
   await print();
   console.log('--------------------------------------')
	
    p = readlineSync.question('Enter your Primary !...  ');
	while(typeof(p)!=Number){
		p = readlineSync.question('Enter your Primary !...  ');
	}
    g = readlineSync.question('Enter your Generateur !...  '); 
   
   let pub=((g**priv) % p)
   const arr=[pub,g,p]
 client1.write((JSON.stringify(arr)).toString());  

});

//Handle data coming from the server
client1.on('data', async function(data){
   if (data.toString()=='2') x=2
  
   if(x==null){
   val.push(data.toString())
   sec=(val[0]**priv)%p
   console.log(`Public key from server : ${val}`)
   console.log('key changed successful. !');
   console.log(`your secret key is: ${sec} `)
   var m = readlineSync.question('Enter your massage for Encryption!...  '); 
   let chapiter=2   
   client1.write(chapiter.toString())
   const mm=crypt(m,sec) 
   console.log(`massage cipher is : ${mm}`)
   client1.write(mm)
   console.log('--------------------------------------')

   binnary=text2Binary(mm)	
	console.log(binnary)
   }
});

client1.on('close',function(){
   console.log('Cleint 1 :Connection Closed');
});

client1.on('error',function(error){
   console.error(`Connection Error ${error}`); 
});
function crypt( phrase, niveau){   
	 let s = niveau*2-2;
	 var crypto='';
	if((niveau==0 ) || (niveau== 1) ){
		return phrase;
	}
	for( let i=0;i<niveau;i++){
		 let j=i;
		while(j<phrase.length){
			let t= s-2*i;
			if(t==s || t==0){              
				crypto+=phrase[j];
				j+=s;             
			}else{
				crypto+=phrase[j]; 
				j+=t;
				if(j<phrase.length)
				crypto+=phrase[j];
				j+=(s-t);
			}
		}
	}	
	return crypto;
}
function text2Binary(string) {
	let count=0
    let res= string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
	console.log(` your massage in binnary is : ${res}`)
	for(let i=0;i<res.length;i++){
		if(res[i]==1)count++
	}
	return count
}
// process.stdin.once("data",(input)=>{
//    console.log('Enter Prime');
//    const p=input.toString()
//    console.log(p)
//    client1.write(p.toString().trim())
// })