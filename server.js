const { count } = require("console")
const net=require("net")
const val=[]

const server = net.createServer(async socket=>{
    
     const g=3
     const p=17
     const priv=13
     const pub=(g**priv)%p
	 let x=null

    socket.on("data",data=>{
		if (data.toString()=='2') x=2
		if (data.toString()=='3') x=3
		if (data.toString()=='4') x=4
		console.log(`client sent : ${data.toString()}`)
		
		if (x==null){
        val.push(data.toString())
        console.log(`Public key from client: ${val}`)
        socket.write(pub.toString())
        sec=(val[0]**priv)%p
		console.log(`your secret key is: ${sec} `)
		}else if(x==2){
			const crypted=crypt(data.toString(),sec)
			const chapiter=2   
			socket.write(chapiter.toString())
			socket.write(crypted)
		}else if(x==3){
			const dcrypted=decrypt(data.toString(),sec)
			const chapiter=3   
			socket.write(chapiter.toString())
			socket.write(dcrypted)
		}else if(x==4){
			let binnary
			if(data.toString()=='4'){ binnary='4'}else{
			 binnary=text2Binary(data.toString())	
			console.log(binnary)
			}
			const chapiter=4
			socket.write(chapiter.toString())
			socket.write(binnary.toString())
		}
    })      
})
server.listen(8080)

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

 function decrypt( p, key){
	let s = key*2-2 ;
	let cleanMessage=''
    var res = [p.length-1];
   
	if((key==0 ) || (key== 1) ){
		return res;
	}
	let index = 0;
	for(let i=0;i<key;i++){
		let t = s-(2*i);
		for(let j=i ;j<p.length;){
			if(t==s || t==0){
				res[j]=p[index];
				j+=s;
				index++;
			}else{
				res[j]=p[index];
				j+=t;
				index++;
				if(j<p.length){
					res[j]=p[index];
					j+=s-t;
					index++;	
				}
			}
		}
	}
    
    res.forEach(el=>{
        cleanMessage+=el  
    })
	return cleanMessage;
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





