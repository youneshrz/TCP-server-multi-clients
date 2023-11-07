const { count } = require("console")
const net=require("net")
const val=[]

const server = net.createServer(async socket=>{
    
     let g
     let p
     const priv=13
     let pub
	 let x=null

    socket.on("data",data=>{
		if (data.toString()=='2') x=2
	
		if (x==null){
           
		JSON.parse(data).forEach((el)=>{
			val.push(el.toString())
		})
		g=val[1]
		p=val[2]
		pub=(g**priv)%p
        console.log(`Primary key from client: ${p}`)
        console.log(`generater key from client: ${g}`)
        console.log(`Public key from client: ${val[0]}`)
        socket.write(pub.toString())
        sec=(val[0]**priv)%p
		console.log(`your secret key is: ${sec} `)
		}else if(x==2){
			let binnary
			if(data.toString()=='2'){ binnary='2'}else{
			console.log('--------------------------------------')
			console.log(` Message Cipher is: ${data.toString()} `)
			const dcrypted=decrypt(data.toString(),sec)
			console.log(` Message clear is: ${dcrypted} `)
			console.log('--------------------------------------')
			binnary=text2Binary(data.toString())	
			console.log(binnary)
			}
			
		}
    })      
})
server.listen(8080)


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





